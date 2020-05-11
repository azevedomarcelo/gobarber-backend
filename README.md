# Recuperação de senha

**RF(Requisitos Funcionais)**

- O usuário deve poder recuperar a sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF(Requisitos Não Funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios de email em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN(Regras de Negócios)**

- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuário precisa confimar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF(Requisitos Funcionais)**

- O usuário deve poder atualizar seu nome, email e senha;

**RN(Regras de Negócios)**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF(Requisitos Funcionais)**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber um notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF(Requisitos Não Funcionais)**

- Os agendamentos do prestador devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket-IO;

**RN(Regras de Negócios)**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF(Requisitos Funcionais)**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários diponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF(Requisitos Não Funcionais)**

- A listagem de prestadores devem ser armazenadas em cache;

**RN(Regras de Negócios)**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8h às 18h (Primeiro às 8h e o último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
