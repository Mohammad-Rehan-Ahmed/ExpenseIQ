import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatWithAI } from "../services/chatService";

function AIChat() {

    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {

        if (!message.trim()) return;

        try {

            setLoading(true);

            const data = await chatWithAI(message);

            setReply(data.reply);

        } catch (err) {

            console.log(err);

            setReply("Unable to contact AI.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <motion.div
            className="card shadow mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
                scale: 1.01,
                y: -5,
            }}
        >

            <div className="card-body">

                <h3 className="text-center">
                    🤖 AI Chat Assistant
                </h3>

                <hr />

                <motion.textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ask anything about your expenses..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    whileFocus={{
                        scale: 1.01,
                    }}
                />

                <motion.button
                    className="btn btn-primary mt-3"
                    onClick={handleSend}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    Ask AI
                </motion.button>

                {loading && (

                    <motion.p
                        className="mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        🤖 Thinking...
                    </motion.p>

                )}

                {reply && (

                    <motion.div
                        className="alert alert-info mt-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {reply}
                        </ReactMarkdown>

                    </motion.div>

                )}

            </div>

        </motion.div>

    );

}

export default AIChat;