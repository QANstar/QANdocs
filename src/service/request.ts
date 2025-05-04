/**
 * 通用请求方法封装
 * 基于 fetch API
 */

// 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

// 请求配置接口
export interface RequestOptions extends RequestInit {
	// 请求超时时间，单位毫秒，默认 30 秒
	timeout?: number;
	// 是否自动解析响应 JSON
	parseJson?: boolean;
	// 基础 URL，如果提供则会和 url 拼接
	baseURL?: string;
	// 请求参数，用于 GET 请求的查询参数或 POST 等请求的 body
	data?: any;
	// 自定义请求头
	headers?: HeadersInit;
	// 是否携带凭证（cookies）
	withCredentials?: boolean;
	// 响应类型
	responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
	// 重试次数
	retries?: number;
	// 重试延迟时间(ms)
	retryDelay?: number;
	// 请求前的钩子函数
	beforeRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
	// 响应前的钩子函数
	beforeResponse?: (response: Response, config: RequestConfig) => Response | Promise<Response>;
	// 错误处理钩子函数
	onError?: (error: Error, config: RequestConfig) => void | Promise<void>;
}

// 内部请求配置
export interface RequestConfig extends RequestOptions {
	url: string;
	method: HttpMethod;
}

// 错误类型
export class RequestError extends Error {
	public status?: number;
	public statusText?: string;
	public data?: any;
	public config: RequestConfig;

	constructor(message: string, config: RequestConfig, status?: number, statusText?: string, data?: any) {
		super(message);
		this.name = 'RequestError';
		this.status = status;
		this.statusText = statusText;
		this.data = data;
		this.config = config;
	}
}

// 通用请求函数
export async function request<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
	// 默认配置
	const defaultOptions: RequestOptions = {
		timeout: 30000,
		parseJson: true,
		retries: 0,
		retryDelay: 1000,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// 合并配置
	const config: RequestConfig = {
		...defaultOptions,
		...options,
		url,
		method: (options.method as HttpMethod) || 'GET',
		headers: {
			...defaultOptions.headers,
			...options.headers,
		},
	};

	// 处理 baseURL
	if (config.baseURL) {
		url = `${config.baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
	}

	// 处理查询参数（对于 GET 请求）
	if (config.data && (config.method === 'GET' || config.method === 'HEAD')) {
		const queryParams = new URLSearchParams();
		Object.entries(config.data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryParams.append(key, String(value));
			}
		});
		const queryString = queryParams.toString();
		if (queryString) {
			url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
		}
	}

	// 处理请求体（对于非 GET 请求）
	if (config.data && !['GET', 'HEAD'].includes(config.method)) {
		if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
			config.body = JSON.stringify(config.data);
		} else {
			config.body = config.data;
		}
	}

	// 应用请求前钩子
	if (config.beforeRequest) {
		const newConfig = await config.beforeRequest(config);
		Object.assign(config, newConfig);
	}

	// 创建 AbortController 用于超时控制
	const controller = new AbortController();
	const { signal } = controller;

	// 设置超时
	const timeoutId = config.timeout ? setTimeout(() => controller.abort(), config.timeout) : undefined;

	// 主请求函数
	const fetchWithRetry = async (retryCount = 0): Promise<T> => {
		try {
			// 发送请求
			const response = await fetch(url, {
				...config,
				headers: config.headers,
				method: config.method,
				signal,
				credentials: config.withCredentials ? 'include' : 'same-origin',
			});

			// 应用响应前钩子
			let processedResponse = response;
			if (config.beforeResponse) {
				processedResponse = await config.beforeResponse(response, config);
			}

			// 清除超时
			if (timeoutId) clearTimeout(timeoutId);

			// 处理非成功状态码
			if (!processedResponse.ok) {
				let errorData;
				try {
					// 尝试解析错误响应
					errorData = await processedResponse.json();
				} catch (e) {
					errorData = { message: processedResponse.statusText };
				}

				const error = new RequestError(
					`Request failed with status ${processedResponse.status}`,
					config,
					processedResponse.status,
					processedResponse.statusText,
					errorData
				);

				// 应用错误处理钩子
				if (config.onError) {
					await config.onError(error, config);
				}

				// 处理重试逻辑
				if (retryCount < (config.retries || 0)) {
					const delay = config.retryDelay || 1000;
					await new Promise((resolve) => setTimeout(resolve, delay));
					return fetchWithRetry(retryCount + 1);
				}

				throw error;
			}

			// 根据指定的响应类型解析响应
			let result: any;
			switch (config.responseType) {
				case 'json':
					result = await processedResponse.json();
					break;
				case 'text':
					result = await processedResponse.text();
					break;
				case 'blob':
					result = await processedResponse.blob();
					break;
				case 'arrayBuffer':
					result = await processedResponse.arrayBuffer();
					break;
				case 'formData':
					result = await processedResponse.formData();
					break;
				default:
					result = config.parseJson ? await processedResponse.json() : processedResponse;
			}

			return result as T;
		} catch (error: any) {
			// 清除超时
			if (timeoutId) clearTimeout(timeoutId);

			// 处理超时错误
			if (error.name === 'AbortError') {
				const timeoutError = new RequestError(`Request timeout after ${config.timeout}ms`, config);

				// 应用错误处理钩子
				if (config.onError) {
					await config.onError(timeoutError, config);
				}

				throw timeoutError;
			}

			// 处理网络错误等其他错误
			if (!(error instanceof RequestError)) {
				const requestError = new RequestError(error.message || 'Network error', config);

				// 应用错误处理钩子
				if (config.onError) {
					await config.onError(requestError, config);
				}

				// 处理重试逻辑
				if (retryCount < (config.retries || 0)) {
					const delay = config.retryDelay || 1000;
					await new Promise((resolve) => setTimeout(resolve, delay));
					return fetchWithRetry(retryCount + 1);
				}

				throw requestError;
			}

			throw error;
		}
	};

	return fetchWithRetry();
}

// 常用请求方法快捷函数
export const http = {
	get: <T = any>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'GET' }),

	post: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'POST', data }),

	put: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'PUT', data }),

	delete: <T = any>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'DELETE' }),

	patch: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...options, method: 'PATCH', data }),
};

// 创建自定义请求实例
export function createHttp(defaultOptions: RequestOptions = {}) {
	return {
		request: <T = any>(url: string, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options }),

		get: <T = any>(url: string, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options, method: 'GET' }),

		post: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options, method: 'POST', data }),

		put: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options, method: 'PUT', data }),

		delete: <T = any>(url: string, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options, method: 'DELETE' }),

		patch: <T = any>(url: string, data?: any, options?: RequestOptions) => request<T>(url, { ...defaultOptions, ...options, method: 'PATCH', data }),
	};
}

export default http;
