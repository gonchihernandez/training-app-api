CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gravatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercices (
    name VARCHAR(255) NOT NULL,
    sets NUMERIC NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Exercices PRIMARY KEY (name)
);

CREATE TABLE trainings (
    name VARCHAR(255) NOT NULL,
    image BYTEA,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Trainings PRIMARY KEY (name)
);

CREATE TABLE trainings_sessions (
    id SERIAL NOT NULL,
	training_name VARCHAR(255) NOT NULL,
	exercice_name VARCHAR(255) NOT NULL,
	CONSTRAINT FK_Training FOREIGN KEY (training_name) REFERENCES trainings(name),
	CONSTRAINT FK_Exercice FOREIGN KEY (exercice_name) REFERENCES exercices(name),
    CONSTRAINT PK_Trainings_sessions PRIMARY KEY (id)
);

CREATE TABLE user_trainings (
    id SERIAL NOT NULL,
	training VARCHAR(255) NOT NULL,
	student INTEGER NOT NULL,
	CONSTRAINT FK_Training FOREIGN KEY (training) REFERENCES trainings(name),
	CONSTRAINT FK_User FOREIGN KEY (student) REFERENCES users(id),
    CONSTRAINT PK_User_trainings_sessions PRIMARY KEY (id),   
    CONSTRAINT UQ_TrainingStudent UNIQUE (training, student)
);


