-- -- CreateTable
-- CREATE TABLE `Aluno` (
--     `id` VARCHAR(191) NOT NULL,
--     `nome` VARCHAR(191) NOT NULL,
--     `turma` VARCHAR(191) NOT NULL,
--     `nascimento` VARCHAR(191) NOT NULL,
--     `matricula` VARCHAR(191) NOT NULL,
--     `avatar` INTEGER NOT NULL,

--     UNIQUE INDEX `Aluno_id_key`(`id`),
--     UNIQUE INDEX `Aluno_matricula_key`(`matricula`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Result` (
--     `id` VARCHAR(191) NOT NULL,
--     `alunoId` VARCHAR(191) NOT NULL,
--     `desafio` INTEGER NOT NULL,
--     `points` INTEGER NOT NULL,
--     `time` INTEGER NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     UNIQUE INDEX `Result_id_key`(`id`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE Aluno (
    id VARCHAR(191) NOT NULL,
    nome VARCHAR(191) NOT NULL,
    turma VARCHAR(191) NOT NULL,
    nascimento VARCHAR(191) NOT NULL,
    matricula VARCHAR(191) NOT NULL,
    avatar INTEGER NOT NULL,

    CONSTRAINT Aluno_id_key UNIQUE (id),
    CONSTRAINT Aluno_matricula_key UNIQUE (matricula),
    CONSTRAINT Aluno_pk PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Result (
    id VARCHAR(191) NOT NULL,
    alunoId VARCHAR(191) NOT NULL,
    desafio INTEGER NOT NULL,
    points INTEGER NOT NULL,
    time INTEGER NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    CONSTRAINT Result_id_key UNIQUE (id),
    CONSTRAINT Result_pk PRIMARY KEY (id)
);
