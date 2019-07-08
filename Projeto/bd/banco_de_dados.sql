/*    ==Parâmetros de Script==

    Versão do Servidor de Origem : SQL Server 2016 (13.0.4224)
    Edição do Mecanismo de Banco de Dados de Origem : Microsoft SQL Server Enterprise Edition
    Tipo do Mecanismo de Banco de Dados de Origem : SQL Server Autônomo

    Versão do Servidor de Destino : SQL Server 2017
    Edição de Mecanismo de Banco de Dados de Destino : Microsoft SQL Server Standard Edition
    Tipo de Mecanismo de Banco de Dados de Destino : SQL Server Autônomo
*/
USE [master]
GO
/****** Object:  Database [MarmitaBeleaf]    Script Date: 08/07/2019 10:18:59 ******/
CREATE DATABASE [MarmitaBeleaf]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MarmitaBeleaf', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\MarmitaBeleaf.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MarmitaBeleaf_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\MarmitaBeleaf_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MarmitaBeleaf] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MarmitaBeleaf].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MarmitaBeleaf] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET ARITHABORT OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MarmitaBeleaf] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MarmitaBeleaf] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MarmitaBeleaf] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MarmitaBeleaf] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET RECOVERY FULL 
GO
ALTER DATABASE [MarmitaBeleaf] SET  MULTI_USER 
GO
ALTER DATABASE [MarmitaBeleaf] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MarmitaBeleaf] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MarmitaBeleaf] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MarmitaBeleaf] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MarmitaBeleaf] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'MarmitaBeleaf', N'ON'
GO
ALTER DATABASE [MarmitaBeleaf] SET QUERY_STORE = OFF
GO
USE [MarmitaBeleaf]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [MarmitaBeleaf]
GO
/****** Object:  User [usrmarmita]    Script Date: 08/07/2019 10:18:59 ******/
CREATE USER [usrmarmita] FOR LOGIN [usrmarmita] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [usrmarmita]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [usrmarmita]
GO
/****** Object:  Table [dbo].[Marmita]    Script Date: 08/07/2019 10:18:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marmita](
	[Codigo] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](150) NOT NULL,
	[Descricao] [varchar](2000) NOT NULL,
	[Preco] [money] NOT NULL,
	[Ingredientes] [varchar](2000) NOT NULL,
	[Quantidade] [float] NOT NULL,
	[Url] [varchar](1000) NOT NULL,
	[PorcentagemDesconto] [float] NULL,
	[PrecoDesconto] [money] NULL,
 CONSTRAINT [PK_Marmita] PRIMARY KEY CLUSTERED 
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [MarmitaBeleaf] SET  READ_WRITE 
GO
