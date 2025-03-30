import React, { useState } from 'react';
import styles from './index.module.less';

interface Message {
	id: number;
	text: string;
	isUser: boolean;
}

const AiChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [useText, setUseText] = useState(false);

	const sendMessage = () => {
		if (!input.trim()) return;

		const newUserMessage: Message = { id: Date.now(), text: input.trim(), isUser: true };
		setMessages([...messages, newUserMessage]);
		setInput('');
		simulateAiResponse(input.trim());
	};

	const simulateAiResponse = (userMsg: string) => {
		// 模拟 AI 响应，真实项目中可替换为调用后端 API
		setTimeout(() => {
			const responseText = useText ? `AI 回答（使用本文）：${userMsg}` : `AI 回答：${userMsg}`;
			const newAiMessage: Message = { id: Date.now(), text: responseText, isUser: false };
			setMessages((prev) => [...prev, newAiMessage]);
		}, 1000);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const toggleUseText = () => {
		setUseText((prev) => !prev);
	};

	const resetConversation = () => {
		setMessages([]);
	};

	return (
		<div className={styles.aiChat}>
			<div className={styles.messagesContainer}>
				{messages.map((message) => (
					<div key={message.id} className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}>
						{message.text}
					</div>
				))}
			</div>
			<div className={styles.header}>
				<button className={`${styles.toggleButton} ${useText ? styles.toggleOn : styles.toggleOff}`} onClick={toggleUseText}>
					{useText ? '关闭 使用本文' : '开启 使用本文'}
				</button>
				<button className={styles.resetButton} onClick={resetConversation}>
					重置对话
				</button>
			</div>
			<div className={styles.inputContainer}>
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="输入消息..." />
				<button onClick={sendMessage}>发送</button>
			</div>
		</div>
	);
};

export default AiChat;
