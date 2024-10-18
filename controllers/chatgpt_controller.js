const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const chatController = async (req, res) => {
    const userMessage = req.body.userMessage;

    
    console.log('Mensagem do usuário:', userMessage);

    const messages = [
        {
            role: "system",
            content: `Você é um agente especializado em identificar o hiperfoco, habilidades e os interesses de pessoas autistas. 
                      Sua tarefa é interagir com o usuário, fazendo quantas perguntas forem necessárias para que você entenda de maneira nítida e coerente qual o hiperfoco, habilidades e interesses do usuário. 
                      Conduza a conversa com empatia e sensibilidade, formulando suas próprias perguntas para descobrir o hiperfoco do usuário e chegando a uma conclusão clara, coerente e concisa.`
        },
        { role: "user", content: userMessage }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",  
            messages
            
            
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Organization': process.env.OPENAI_ORGANIZATION_ID
            }
        });
        console.log(messages);
        const reply = response.data.choices[0].message.content;
        res.json({ message: reply });
    } catch (error) {
        console.error('Erro:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = { chatController };
