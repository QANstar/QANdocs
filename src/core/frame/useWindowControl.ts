const useWindowControl = () => {
	// 处理最小化按钮点击
	const minimize = () => {
		window.electronAPI.frame.minimize();
	};

	const maximize = () => {
		window.electronAPI.frame.toggleMaximize();
	};

	const close = () => {
		window.electronAPI.frame.close();
	};

	return { minimize, maximize, close };
};

export default useWindowControl;
