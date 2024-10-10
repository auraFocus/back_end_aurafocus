const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const UserStudent = require('../models/user_student'); // Ajuste o caminho para o seu model

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://martinsmateus:wLRhG8ojzLfFPIcn@cluster0.wb5nx9h.mongodb.net/aura_focus?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err));

const generateRandomCpf = () => {
  const randomNum = () => Math.floor(10000000000 + Math.random() * 90000000000);
  return randomNum().toString();
};

const generateRandomPhone = () => {
  return `+55 ${Math.floor(Math.random() * (99 - 10) + 10)} 9${Math.floor(Math.random() * (99999999 - 10000000) + 10000000)}`;
};

const createStudent = async (index) => {
  const hashedPassword = await bcrypt.hash('defaultPassword123', 10); 
  
  return {
    id: uuidv4(),
    name: `Aluno ${index}`,
    username: `student_${index}`,
    password: hashedPassword,
    cpf: generateRandomCpf(),
    address: {
      street: 'Rua Aleatória',
      number: Math.floor(Math.random() * 500)
    },
    phone: generateRandomPhone(),
    parent_id: uuidv4(), 
    role: 'USER_STUDENDT',
    school_id: uuidv4(), 
  };
};

const insertStudents = async () => {
  const students = [];
  for (let i = 1; i <= 300; i++) {
    const student = await createStudent(i);
    students.push(student);
  }

  // Inserir no MongoDB
  UserStudent.insertMany(students)
    .then(() => {
      console.log('Registros inseridos com sucesso!');
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Erro ao inserir registros:', err);
    });
};

insertStudents();
