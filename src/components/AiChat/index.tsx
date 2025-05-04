import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import useAiChat from '../../core/ai/useAiChat';
import { useAtom } from 'jotai';
import { aiAtom } from '../../store/ai';
import { ChatRole } from '../../types/ai';
import i18n from '../../i18n';

const AiChat = () => {
	const { messages, chat, reset, init } = useAiChat();
	const [input, setInput] = useState('');
	const [aiSetting] = useAtom(aiAtom);

	const sendMessage = () => {
		if (!input.trim()) return;
		chat(input);
		setInput('');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const resetConversation = () => {
		reset();
	};

	useEffect(() => {
		if (!aiSetting.apiKey && !aiSetting.url) return;
		init(aiSetting);
	}, [aiSetting]);

	return (
		<div className={styles.aiChat}>
			<div className={styles.messagesContainer}>
				{messages.map((message) => (
					<div key={message.id} className={`${styles.message} ${message.role === ChatRole.USER ? styles.userMessage : styles.aiMessage}`}>
						{message.content}
					</div>
				))}
			</div>
			<div className={styles.header}>
				<button className={styles.resetButton} onClick={resetConversation}>
					{i18n.t('aiChat.resetConversation')}
				</button>
			</div>
			<div className={styles.inputContainer}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={i18n.t('aiChat.inputPlaceholder')}
				/>
				<button onClick={sendMessage}>{i18n.t('aiChat.send')}</button>
			</div>
		</div>
	);
};

export default AiChat;
