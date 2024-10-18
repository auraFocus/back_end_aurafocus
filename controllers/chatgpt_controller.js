const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const Student = require('../models/user_student');



let conversationHistory = [
    {
        role: "system",
        content: `Você é um agente especializado em identificar o hiperfoco e os interesses de pessoas autistas. 
                  Sua tarefa é interagir com o usuário, fazendo no máximo 10 perguntas para que você entenda de maneira nítida e coerente qual o hiperfoco, habilidades e interesses do usuário. 
                  Conduza a conversa com empatia e sensibilidade, formulando suas próprias perguntas para descobrir o hiperfoco do usuário e chegando a uma conclusão clara, coerente e concisa.
                  E na sua mensagem preciso que seja bem curta e direta fale apenas esse exemplo: Seu hiperfoco é "hiperfoco da pessoa que você está conversando" e seus interesses são "interesses 
                  da pessoa que você está conversando"`
    }
];

const chatController = async (req, res) => {
    const {userMessage, studentId} = req.body;
    
    console.log('Mensagem do usuário:', userMessage);

   
    conversationHistory.push({ role: "user", content: userMessage });

    try {
      
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",  
            messages: conversationHistory  
            
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Organization': process.env.OPENAI_ORGANIZATION_ID
            }
        });

        
        const reply = response.data.choices[0].message.content;
        conversationHistory.push({ role: "assistant", content: reply });
        const hyperfocusMatch = reply.match(/Seu hiperfoco é "(.*?)"/);
        const hyperfocus = hyperfocusMatch ? hyperfocusMatch[1] : null;
        
        if(hyperfocus){
            await Student.findByIdAndUpdate(studenId,{hyperfocus});
        }
        console.log(`Hiperfoco salvo para o estudante ${studentId}: ${hyperfocus}`);

        res.json({ message: reply });
    } catch (error) {
        console.error('Erro:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = { chatController };
