import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";

function Alerts() {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {

        try {

            const data = await getAlerts();
            setAlerts(data.alerts);

        } catch (err) {

            console.log(err);

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
        >

            <div className="card-body">

                <h3>🚨 Smart Spending Alerts</h3>

                <hr />

                {loading ? (

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Checking your expenses...
                    </motion.p>

                ) : (

                    alerts.length === 0 ? (

                        <motion.div
                            className="alert alert-success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            ✅ No alerts. Your spending looks healthy.
                        </motion.div>

                    ) : (

                        alerts.map((alert, index) => (

                            <motion.div
                                key={index}
                                className="alert alert-warning"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.15,
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    x: 8,
                                }}
                            >
                                {alert}
                            </motion.div>

                        ))

                    )

                )}

            </div>

        </motion.div>

    );
}

export default Alerts;