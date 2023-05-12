CREATE DATABASE db_VERA
GO
USE db_VERA
GO
CREATE SCHEMA acce
GO
CREATE SCHEMA mant
GO
CREATE SCHEMA vera
GO
CREATE SCHEMA fact

GO

--*****************************************************************ACCE************************************************************************--

--*************************************************************Tabla Usuarios******************************************************************--

 CREATE TABLE acce.tbUsuarios(
 user_Id				INT IDENTITY(1,1),
 user_NombreUsuario		NVARCHAR(200)	NOT NULL,
 empl_Id				INT				NOT NULL,	
 user_Contraseña		NVARCHAR(150)	NOT NULL,
 user_Admin				BIT				NOT NULL,
 role_Id				INT,
 user_Estado			BIT							DEFAULT 1,
 user_UserCrea			INT				NOT NULL,
 user_FechaCrea			DATETIME					DEFAULT GETDATE(),
 user_UserModifica		INT,
 user_FechaModifica		DATETIME
 CONSTRAINT PK_acce_tbUsuarios_user_Id				PRIMARY KEY ([user_Id]),
 CONSTRAINT UQ_acce_tbUsuarios_user_NombreUsuario	UNIQUE (user_NombreUsuario)
 );

 GO


--*************************************************************/Tabla Usuarios******************************************************************--

--------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Pantallas******************************************************************--

 CREATE TABLE acce.tbPantallas(
 pant_Id				INT IDENTITY(1,1),
 pant_Nombre			NVARCHAR(150)	NOT NULL,
 pant_Identificador		CHAR(8)			NOT NULL,
 pant_href				NVARCHAR(70)	NOT NULL,

 /********Campos de Auditoria*********/
 pant_Estado			BIT							DEFAULT 1,
 pant_UserCrea			INT				NOT NULL,
 pant_FechaCrea			DATETIME					DEFAULT GETDATE(),
 pant_UserModifica		INT,
 pant_FechaModifica		DATETIME
 CONSTRAINT PK_acce_tbPantallas_pant_Id				PRIMARY KEY(pant_Id),
 CONSTRAINT UQ_acce_tbPantallas_pant_Nombre			UNIQUE (pant_Nombre),
 CONSTRAINT UQ_acce_tbPantallas_pant_Identificador	UNIQUE (pant_Identificador),
 CONSTRAINT UQ_acce_tbPantallas_pant_href			UNIQUE (pant_href)
 );

 GO 
--*************************************************************/Tabla Pantallas******************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------

--****************************************************************Tabla Roles********************************************************************--

 CREATE TABLE acce.tbRoles(
 role_Id				INT IDENTITY(1,1),
 role_Descripcion		VARCHAR(150)	NOT NULL,

 /********Campos de Auditoria*********/
 role_Estado			BIT							DEFAULT 1,
 role_UserCrea			INT				NOT NULL,
 role_FechaCrea			DATETIME					DEFAULT GETDATE(),
 role_UserModifica		INT,
 role_FechaModifica		DATETIME
 CONSTRAINT PK_acce_tbRoles_role_Id					PRIMARY KEY(role_Id),
 CONSTRAINT UQ_role_tbRoles_role_Descripcion		UNIQUE(role_Descripcion)
 );
 GO
 --****************************************************************/Tabla Roles********************************************************************--

 ----------------------------------------------------------------------------------------------------------------------------------------------------

--**********************************************************Tabla Roles Por Pantallas**************************************************************--
 CREATE TABLE acce.tbPantallasPorRol(
 pantrol_Id				INT IDENTITY(1,1),
 role_Id				INT				NOT NULL,
 pant_Id				INT				NOT NULL,

 /********Campos de Auditoria*********/
 pantrol_Estado			BIT									DEFAULT 1,
 pantrol_UserCrea		INT				NOT NULL,
 pantrol_FechaCrea		DATETIME							DEFAULT GETDATE(),
 pantrol_UserModifica	INT,
 pantrol_FechaModifica	DATETIME,
 CONSTRAINT PK_acce_tbPantallasPorRol_pantrol_Id			PRIMARY KEY(pantrol_Id),
 CONSTRAINT FK_acce_tbPantallasPorRol_tbRoles_role_Id		FOREIGN KEY (role_Id)		REFERENCES acce.tbRoles(role_Id),
 CONSTRAINT FK_acce_tbPantallasPorRol_tbPantallas_pant_Id	FOREIGN KEY (pant_Id)		REFERENCES acce.tbPantallas(pant_Id),
 );
GO
 --*********************************************************/Tabla Roles Por Pantallas**************************************************************--

 --******************************************************************/ACCE**************************************************************************--



-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------



 --*********************************************************************MANT************************************************************************--

 --*************************************************************Tabla Departamentos*****************************************************************--
 CREATE TABLE mant.tbDepartamentos(
 dept_Id			CHAR(2),
 dept_Descripcion	NVARCHAR(200)	NOT NULL,

 /********Campos de Auditoria*********/
 dept_Estado		BIT								 DEFAULT 1,
 dept_UserCrea		INT				NOT NULL,
 dept_FechaCrea		DATETIME						 DEFAULT GETDATE(),
 dept_UserModifica	INT,
 dept_FechaModifica	DATETIME
 CONSTRAINT PK_mant_tbDepartamentos_dept_Id			 PRIMARY KEY(dept_Id),
 CONSTRAINT UQ_mant_tbDepartamentos_dept_Descripcion UNIQUE(dept_Descripcion)
 );
 GO
 --*************************************************************/Tabla Departamentos*****************************************************************--

 ------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Municipios******************************************************************--
 CREATE TABLE mant.tbMunicipios(
 muni_Id			CHAR(4),
 dept_Id			CHAR(2)			NOT NULL,
 muni_Descripcion	NVARCHAR(200)	NOT NULL,

 /********Campos de Auditoria*********/
 muni_Estado		BIT							DEFAULT 1,
 muni_UserCrea		INT				NOT NULL,
 muni_FechaCrea		DATETIME					DEFAULT GETDATE(),
 muni_UserModifica	INT,
 muni_FechaModifica	DATETIME
 CONSTRAINT PK_mant_tbMunicipios_muni_Id		PRIMARY KEY(muni_Id),
 CONSTRAINT FK_mant_tbMunicipios_dept_Id		FOREIGN KEY (dept_Id)	REFERENCES mant.tbDepartamentos (dept_Id)
 );
 GO
--***************************************************************/Tabla Municipios******************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Estados Civiles****************************************************************--
 CREATE TABLE mant.tbEstadosCiviles(
 estc_Id			INT IDENTITY(1,1),
 estc_Descripcion	NVARCHAR(100)			NOT NULL,

 /********Campos de Auditoria*********/
 estc_Estado		BIT									DEFAULT 1,
 estc_UserCrea		INT						NOT NULL,
 estc_FechaCrea		DATETIME							DEFAULT GETDATE(),
 estc_UserModifica	INT,
 estc_FechaModifica	DATETIME
 CONSTRAINT PK_mant_tbEstadosCiviles_estc_Id			PRIMARY KEY (estc_Id),
 CONSTRAINT UQ_mant_tbEstadosCiviles_estc_Descripcion	UNIQUE (estc_Descripcion)
 );
 GO
 --***********************************************************/Tabla Estados Civiles****************************************************************--
 
------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Cargos*********************************************************************--
 CREATE TABLE mant.tbCargos(
 carg_Id					INT IDENTITY(1,1),
 carg_Descripcion			NVARCHAR(150)	NOT NULL,

 /********Campos de Auditoria*********/
 carg_UserCrea				INT				NOT NULL,
 carg_FechaCrea				DATETIME		NOT NULL	DEFAULT(GETDATE()),
 carg_UserModifica			INT,
 carg_FechaModificacion		DATETIME,
 carg_Estado				BIT				NOT NULL	DEFAULT(1)
 CONSTRAINT PK_mant_tbCargos_carg_Id					PRIMARY KEY (carg_Id),
 CONSTRAINT UQ_mant_tbCargos_carg_Descripcion			UNIQUE (carg_Descripcion)

 );
 GO
--****************************************************************/Tabla Cargos*********************************************************************--
 
--******************************************************************/MANT***************************************************************************--


-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------


--******************************************************************/VERA***************************************************************************--

--*************************************************************Tabla Sucursales*********************************************************************--
 CREATE TABLE vera.tbSucursales(
 sucu_Id						INT IDENTITY(1,1),
 sucu_Nombre					NVARCHAR(200)	NOT NULL,
 muni_Id						CHAR(4)			NOT NULL,
 sucu_Direccion					NVARCHAR(200),
 sucu_Estado					BIT				NOT NULL	DEFAULT(1),

 /********Campos de Auditoria*********/
 sucu_UserCrea					INT				NOT NULL,	
 sucu_FechaCreacion				DATETIME		NOT NULL	DEFAULT(GETDATE()),
 sucu_UserModifica				INT,
 sucu_FechaModificacion			DATETIME
 CONSTRAINT PK_vera_tbSucursales_sucu_Id					PRIMARY KEY (sucu_Id),
 CONSTRAINT PK_vera_tbSucursales_tbMunicipios_muni_Id		FOREIGN KEY (muni_Id)		REFERENCES mant.tbMunicipios(muni_Id)
 );
 GO
--************************************************************/Tabla Sucursales*********************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Categorias*********************************************************************--
 CREATE TABLE vera.tbCategorias(
 cate_Id					INT IDENTITY(1,1),
 cate_Descripcion			NVARCHAR(100)	NOT NULL,

 /********Campos de Auditoria*********/
 cate_UserCrea				INT				NOT NULL,
 cate_FechaCrea				DATETIME		NOT NULL	DEFAULT(GETDATE()),
 cate_UserModifica			INT,
 cate_FechaModificacion		DATETIME,
 cate_Estado				BIT				NOT NULL	DEFAULT(1)
 CONSTRAINT PK_vera_tbCategorias_cate_Id				PRIMARY KEY (cate_Id),
 CONSTRAINT UQ_mant_tbCategorias_cate_Descripcion		UNIQUE (cate_Descripcion)
 );

 GO
--*************************************************************/Tabla Categorias********************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Marcas*********************************************************************--
 CREATE TABLE vera.tbMarcas(
 marc_Id					INT IDENTITY(1,1),
 marc_Descripcion			NVARCHAR(100)	NOT NULL,	

 /********Campos de Auditoria*********/
 marc_UserCrea				INT				NOT NULL,
 marc_FechaCrea				DATETIME		NOT NULL	DEFAULT(GETDATE()),
 marc_UserModifica			INT,
 marc_FechaModificacion		DATETIME,
 marc_Estado				BIT				NOT NULL	DEFAULT(1)
 CONSTRAINT PK_vera_tbMarcas_marc_Id					PRIMARY KEY (marc_Id),
 CONSTRAINT UQ_mant_tbCategorias_marc_Descripcion		UNIQUE (marc_Descripcion)
 );
 GO
--****************************************************************/Tabla Marcas*********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Empleados********************************************************************--

 CREATE TABLE vera.tbEmpleados(
 empl_Id						INT IDENTITY(1,1),
 empl_Nombres					NVARCHAR(200)	NOT NULL,
 empl_ApellIdos					NVARCHAR(200)	NOT NULL,
 empl_Identidad					NVARCHAR(25)	NOT NULL,
 empl_FechaNacimiento			DATE			NOT NULL,
 empl_Sexo						CHAR(1)			NOT NULL,
 estc_Id						INT				NOT NULL,
 empl_Telefeno					NVARCHAR(20)	NOT NULL,
 muni_Id						CHAR(4)			NOT NULL,
 carg_Id						INT				NOT NULL,
 empl_Direccion					NVARCHAR(200)	NOT NULL,
 sucu_Id						INT				NOT NULL,

 /********Campos de Auditoria*********/
 empl_Estado					BIT				NOT NULL	DEFAULT(1),
 empl_UserCrea					INT				NOT NULL,
 empl_FechaCreacion				DATETIME		NOT NULL	DEFAULT(GETDATE()),
 empl_UserModifica				INT,
 empl_FechaModificacion			DATETIME
 CONSTRAINT PK_vera_tbEmpleados_empl_Id						PRIMARY KEY(empl_Id),
 CONSTRAINT CK_vera_tbEmpleados_empl_Sexo					CHECK(empl_sexo IN ('F', 'M')),
 CONSTRAINT FK_vera_tbEmpleados_tbSucursales_sucu_Id		FOREIGN KEY(sucu_Id)				REFERENCES vera.tbSucursales(sucu_Id),
 CONSTRAINT FK_vera_tbEmpleados_tbEstadosCiviles_estc_Id	FOREIGN KEY (estc_Id)				REFERENCES mant.tbEstadosCiviles (estc_Id),
 CONSTRAINT FK_vera_tbEmpleados_tbMunicipios_muni_Id		FOREIGN KEY (muni_Id)				REFERENCES mant.tbMunicipios (muni_Id),
 CONSTRAINT FK_vera_tbEmpleados_tbCargos_carg_Id			FOREIGN KEY (carg_Id)				REFERENCES mant.tbCargos (carg_Id)
 );
 GO

--***************************************************************/Tabla Empleados*******************************************************************--
 
 -----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Clientes*********************************************************************--
 CREATE TABLE vera.tbClientes(
 clie_Id						INT IDENTITY(1,1),
 clie_Nombres					NVARCHAR(200)		NOT NULL,
 clie_ApellIdos					NVARCHAR(200)		NOT NULL,
 clie_Identidad					NVARCHAR(25)	    NOT NULL,
 clie_FechaNacimiento			DATE				NOT NULL,
 clie_Sexo						CHAR(1)				NOT NULL,
 estc_Id						INT					NOT NULL,
 clie_Telefeno					NVARCHAR(20)		NOT NULL,
 muni_Id						CHAR(4)				NOT NULL,
 clie_Direccion					NVARCHAR(200),

 /********Campos de Auditoria*********/
 clie_Estado					BIT					NOT NULL	DEFAULT(1),
 clie_UserCrea					INT					NOT NULL,
 clie_FechaCreacion				DATETIME			NOT NULL	DEFAULT(GETDATE()),
 clie_UserModifica				INT,
 clie_FechaModificacion			DATETIME
 CONSTRAINT PK_vera_tbClientes_clie_Id							PRIMARY KEY (clie_Id),
 CONSTRAINT CK_vera_tbClientes_clie_Sexo						CHECK(clie_Sexo IN ('F', 'M')),
 CONSTRAINT FK_vera_tbClientes_tbEstadosCiviles_eciv_Id			FOREIGN KEY (estc_Id)				REFERENCES mant.tbEstadosCiviles (estc_Id),
 CONSTRAINT FK_vera_tbClientes_tbMunicipios_muni_Id				FOREIGN KEY (muni_Id)				REFERENCES mant.tbMunicipios (muni_Id)
 );
 GO

--***************************************************************/Tabla Clientes*********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------------

--**************************************************************Tabla Descuentos*********************************************************************--
CREATE TABLE vera.tbDescuentos(
 desc_Id				INT IDENTITY (1,1)	NOT NULL,
 desc_Color				NVARCHAR(100)		NOT NULL,
 desc_ColorHexa         NVARCHAR(100)       NOT NULL,
 desc_Descuento			INT					NOT NULL,
 
 /********Campos de Auditoria*********/
 desc_UserCrea			INT,
 desc_FechaCreacion		DATETIME						DEFAULT GETDATE(),
 desc_UserModificacion	INT,
 desc_FechaModificacion	DATETIME,
 desc_Estado			BIT								DEFAULT 1
 CONSTRAINT PK_vera_tbDescuentos_desc_Id				PRIMARY KEY (desc_Id),
 );

 GO


--***************************************************************/Tabla Descuentos*********************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Proveedores*********************************************************************--
 CREATE TABLE vera.tbProveedores(
  prov_Id						INT IDENTITY(1,1),
  prov_Nombres					NVARCHAR(200)		NOT NULL,
  prov_ApellIdos				NVARCHAR(200)		NOT NULL,
  prov_Telefeno					NVARCHAR(20)		NOT NULL,
  muni_Id						CHAR(4)				NOT NULL,
  prov_Direccion				NVARCHAR(200),
  
  /********Campos de Auditoria*********/
  prov_Estado					BIT					NOT NULL	 DEFAULT(1),
  prov_UserCrea					INT					NOT NULL,
  prov_FechaCreacion			DATETIME			NOT NULL	 DEFAULT(GETDATE()),
  prov_UserModifica				INT,
  prov_FechaModificacion		DATETIME
  CONSTRAINT PK_vera_tbProveedores_prov_Id						 PRIMARY KEY (prov_Id),
  CONSTRAINT FK_vera_tbProveedores_tbMunicipios_muni_Id			 FOREIGN KEY (muni_Id)				REFERENCES mant.tbMunicipios (muni_Id)
 );
 GO
--**************************************************************/Tabla Proveedores*********************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Fardos************************************************************************--
 CREATE TABLE vera.tbFardos(
 fard_Id					INT IDENTITY(1,1)	NOT NULL,
 fard_Descripcion			NVARCHAR(200)		NOT NULL,

 /********Campos de Auditoria*********/
 fard_UserCrea				INT,
 fard_FechaCreacion			DATETIME						DEFAULT GETDATE(),
 fard_UserModificacion		INT,
 fard_FechaModificacion		DATETIME,
 fard_Estado				BIT								DEFAULT 1,

 CONSTRAINT PK_vera_tbFardos_fard_Id						PRIMARY KEY (fard_Id),
 );
 
--****************************************************************/Tabla Fardos************************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Fardos por Proveedor****************************************************************--
 CREATE TABLE vera.tbFardosProveedor(
 fapr_Id					INT IDENTITY(1,1)	NOT NULL,
 fard_Id                    INT NOT NULL,
 prov_Id                    INT NOT NULL,
 fapr_Cantidad				INT NOT NULL,

 /********Campos de Auditoria*********/
 fapr_UserCrea				INT,
 fapr_FechaCreacion			DATETIME						DEFAULT GETDATE(),
 fapr_UserModificacion		INT,
 fapr_FechaModificacion		DATETIME,
 fapr_Estado				BIT								DEFAULT 1,

 CONSTRAINT PK_vera_tbFardosProveedor_fapr_Id						PRIMARY KEY (fapr_Id),
 CONSTRAINT FK_vera_tbFardosProveedor_vera_tbFardos_fard_Id FOREIGN KEY (fard_Id) REFERENCES vera.tbFardos(fard_Id),
 CONSTRAINT FK_vera_tbFardosProveedor_vera_tbProveedores_prov_Id FOREIGN KEY (prov_Id) REFERENCES vera.tbProveedores(prov_Id)
 );
--**********************************************************/Tabla Fardos por Proveedor****************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--****************************************************************Tabla Prendas************************************************************************--
CREATE TABLE vera.tbPrendas(
 pren_Id					INT IDENTITY(1,1)	NOT NULL,
 pren_Descripcion			NVARCHAR(100)		NOT NULL,
 pren_Talla					NVARCHAR(100)		NOT NULL,
 desc_Id					INT					NOT NULL,
 pren_Precio				DECIMAL(8,2)		NOT NULL,
 marc_Id					INT					NOT NULL,
 cate_Id					INT					NOT NULL,
 fard_Id					INT					NOT NULL,
 pren_Imagen				NVARCHAR(MAX)		NOT NULL,
 prend_EstadoTienda			BIT									DEFAULT 1,
 /********Campos de Auditoria*********/
 pren_UserCrea				INT,
 pren_FechaCreacion			DATETIME							DEFAULT GETDATE(),
 pren_UserModificacion		INT,
 pren_FechaModificacion		DATETIME,
 pren_Estado				BIT									DEFAULT 1

CONSTRAINT PK_vera_tbPrendas_pren_Id							PRIMARY KEY(pren_Id),
CONSTRAINT FK_vera_tbPrendas_marc_Id_vera_tbMarcas_marc_Id		FOREIGN KEY(marc_Id) REFERENCES vera.tbMarcas(marc_Id),
CONSTRAINT FK_vera_tbPrendas_cate_Id_vera_tbCategorias_cate_Id	FOREIGN KEY(cate_Id) REFERENCES vera.tbCategorias(cate_Id),
CONSTRAINT FK_vera_tbPrendas_fard_Id_vera_tbFardos_fard_Id		FOREIGN KEY(fard_Id) REFERENCES vera.tbFardos(fard_Id));
GO
--***************************************************************/Tabla Prendas************************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

 --***********************************************************Tabla Métodos de Pago********************************************************************--
CREATE TABLE fact.tbMetodosPagos(
 meto_Id					INT IDENTITY(1,1) NOT NULL,
 meto_Descripcion			NVARCHAR(100) NOT NULL,
 
 /********Campos de Auditoria*********/
 meto_UserCrea				INT,
 meto_FechaCreacion			DATETIME DEFAULT GETDATE(),
 meto_UserModificacion		INT,
 meto_FechaModificacion		DATETIME,
 meto_Estado				BIT DEFAULT 1

 CONSTRAINT PK_fact_tbMetodoPago_meto_Id PRIMARY KEY (meto_Id));
GO
--**********************************************************/Tabla Métodos de Pago********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Factura*********************************************************************--
CREATE TABLE fact.tbFacturas(
 fact_Id				INT IDENTITY(1,1)	NOT NULL,
 clie_Id				INT					NOT NULL,
 empl_Id				INT					NOT NULL,
 fact_Fecha				DATETIME			NOT NULL,
 sucu_Id				INT					NOT NULL,
 meto_Id				INT					NOT NULL,
 
 /********Campos de Auditoria*********/
 fact_UserCrea			INT,
 fact_FechaCreacion		DATETIME							DEFAULT GETDATE(),
 fact_UserModificacion	INT,
 fact_FechaModificacion	DATETIME

 CONSTRAINT PK_fact_tbFacturas_fact_Id						PRIMARY KEY(fact_Id),
 CONSTRAINT FK_fact_tbFacturas_vera_tbClientes_clie_Id		FOREIGN KEY(clie_Id)	REFERENCES vera.tbClientes(clie_Id),
 CONSTRAINT FK_fact_tbFacturas_vera_tbEmpleados_empl_Id		FOREIGN KEY(empl_Id)	REFERENCES vera.tbEmpleados(empl_Id),
 CONSTRAINT FK_fact_tbFacturas_vera_tbSucursales_sucu_Id	FOREIGN KEY(sucu_Id)	REFERENCES vera.tbSucursales(sucu_Id),
 CONSTRAINT FK_fact_tbFacturas_vera_tbMetodosPagos_meto_Id	FOREIGN KEY(meto_Id)	REFERENCES fact.tbMetodosPagos(meto_Id));
 GO
--**************************************************************/Tabla Factura*********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Factura Detalle*****************************************************************--

CREATE TABLE fact.tbFacturaDetalles(
 fade_Id					INT IDENTITY(1,1),
 fact_Id					INT							NOT NULL,
 pren_Id					INT							NOT NULL,
 fade_Cantidad				INT							NOT NULL	DEFAULT 1,
 fade_Total					DECIMAL(8,2)				NOT NULL,
 
 /********Campos de Auditoria*********/
 fade_UserCrea				INT,
 fade_FechaCreacion			DATETIME								DEFAULT GETDATE(),
 fade_UserModificacion		INT,
 fade_FechaModificacion		DATETIME,
 fade_Estado				BIT										DEFAULT 1

 CONSTRAINT PK_fact_tbFacturaDetalles_fade_Id						PRIMARY KEY(fade_Id)
 CONSTRAINT FK_fact_tbFacturaDetalles_tbFacturas_fact_Id			FOREIGN KEY(fact_Id)	REFERENCES fact.tbFacturas(fact_Id),
 CONSTRAINT FK_fact_tbFacturaDetalles_vera_tbPrendas_fact_Id		FOREIGN KEY(pren_Id)	REFERENCES vera.tbPrendas(pren_Id),
 );
 GO
--**********************************************************/Tabla Factura Detalle*****************************************************************--

--******************************************************************/VERA**************************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------


--******************************************************************INSERTS************************************************************************--

--*****************************************************************ACCE************************************************************************--

--*************************************************************Tabla Usuarios******************************************************************--
	DECLARE @User NVARCHAR(100) = 'Admin'
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', 'Admin123'));
	
	INSERT INTO acce.TbUsuarios (user_NombreUsuario, user_Contraseña,empl_Id,role_Id, user_Admin, user_UserCrea, user_Estado)
	VALUES	(@User,@password,1,null,1,1,1)
 GO
--*************************************************************/Tabla Usuarios******************************************************************--

--------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Pantallas******************************************************************--
INSERT INTO [acce].[tbPantallas]
			(pant_Nombre, pant_Identificador, pant_href, pant_UserCrea)
			VALUES
			--Seguridad
			('Usuarios','acceuser','/Usuarios',1),
			('Roles','accerole','/Roles',1),
			--Mantenimiento
			('Departamentos','mantdept','/departamentos',1),
			('Municipios','mantmuni','/municipios',1),
			('Estados Civiles','mantestc','/estadosciviles',1),
			('Cargos','mantcarg','/Cargos',1),
			--Tienda
			('Reporte','verarepo','/Reporte',1),
			('Prendas','verapren','/Prendas',1),
			('Empleados','veraempl','/Empleados',1),
			('Clientes','veraclie','/Clientes',1),
			('Categorias','veracate','/Categorias',1),
			('Marcas','veramarc','/Marcas',1),
			('Descuentos','veradesc','/Descuentos',1),
			('Fardos','verafard','/Fardos',1),
			('Proveedores','veraprov','/Proveedores',1),
			('Sucursales','verasucu','/Sucursales',1),
			--Facturación
			('Metodos de Pago','factmeto','/MetodosPago',1),
			('Facturas','factfact','/Facturas',1)


GO
--*************************************************************/Tabla Pantallas******************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------

--****************************************************************Tabla Roles********************************************************************--
INSERT INTO [acce].[tbRoles]
	([role_Descripcion],[role_UserCrea])
	VALUES
	('Administrador de Seguridad',1),
	('Cajero',1),
	('Gerente',1);
 GO
 --****************************************************************/Tabla Roles********************************************************************--

 ----------------------------------------------------------------------------------------------------------------------------------------------------

--**********************************************************Tabla Roles Por Pantallas**************************************************************--
INSERT INTO [acce].[tbPantallasPorRol]
			(role_Id, pant_Id,pantrol_UserCrea)
			VALUES
			(1,1,1),
			(1,2,1),
			(2,4,1),
			(2,5,1),
			(3,3,1),
			(3,4,1),
			(3,5,1),
			(2,6,1)

 GO
 --*********************************************************/Tabla Roles Por Pantallas**************************************************************--

 --******************************************************************/ACCE**************************************************************************--



-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------



 --*********************************************************************MANT************************************************************************--

 --*************************************************************Tabla Departamentos*****************************************************************--
 
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'01', N'AtlántIda', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'02', N'Colón', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'03', N'Comayagua', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'04', N'Copán', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'05', N'Cortés', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'06', N'Choluteca', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'07', N'El Paraíso', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'08', N'Francisco Morazán', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'09', N'Gracias a Dios', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'10', N'Intibucá', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'11', N'Islas de la Bahía', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'12', N'La Paz', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'13', N'Lempira', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'14', N'Ocotepeque', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'15', N'Olancho', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'16', N'Santa Bárbara', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'17', N'Valle', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime))
INSERT [mant].[tbDepartamentos] ([dept_Id], [dept_Descripcion], [dept_Estado], [dept_UserCrea], [dept_FechaCrea], [dept_UserModifica], [dept_FechaModifica]) VALUES (N'18', N'Yoro', 1, 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.657' AS DateTime));
 GO
 --*************************************************************/Tabla Departamentos*****************************************************************--

 ------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Municipios******************************************************************--

INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0101', N'La Ceiba', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0102', N'El Porvenir', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0103', N'Tela', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0104', N'Jutiapa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0105', N'La Masica', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0106', N'San Francisco', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0107', N'Arizona', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'01', N'0108', N'Esparta', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0201', N'Trujillo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0202', N'Balfate', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0203', N'Iriona', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0204', N'Limón', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0205', N'Sabá', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0206', N'Santa Fe', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0207', N'Santa Rosa de Aguán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0208', N'Sonaguera', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0209', N'Tocoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'02', N'0210', N'Bonito Oriental', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0301', N'Comayagua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0302', N'Ajuterique', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0303', N'El Rosario', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0304', N'Esquías', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0305', N'Humuya', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0306', N'La Libertad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0307', N'Lamaní', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0308', N'La TrinIdad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0309', N'Lejamaní', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0310', N'Meámbar', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0311', N'Minas de Oro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0312', N'Ojos de Agua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0313', N'San Jerónimo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0314', N'San José de Comayagua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0315', N'San José del Potrero', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0316', N'San Luis', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0317', N'San Sebastián', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0318', N'Siguatepeque', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0319', N'Villa de San Antonio', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0320', N'Las Lajas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'03', N'0321', N'Taulabé', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0401', N'Santa Rosa de Copán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0402', N'Cabañas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0403', N'Concepción', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0404', N'Copán Ruinas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0405', N'Corquín', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0406', N'Cucuyagua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0407', N'Dolores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0408', N'Dulce Nombre', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0409', N'El Paraíso', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0410', N'FlorIda', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0411', N'La Jigua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0412', N'La Unión', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0413', N'Nueva Arcadia', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0414', N'San Agustín', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0415', N'San Antonio', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
GO
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0416', N'San Jerónimo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0417', N'San José', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0418', N'San Juan de Opoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0419', N'San Nicolás', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0420', N'San Pedro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0421', N'Santa Rita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0422', N'TrinIdad de Copán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'04', N'0423', N'Veracruz', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0501', N'San Pedro Sula', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0502', N'Choloma', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0503', N'Omoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0504', N'Pimienta', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0505', N'Potrerillos', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0506', N'Puerto Cortés', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0507', N'San Antonio de Cortés', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0508', N'San Francisco de Yojoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0509', N'San Manuel', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0510', N'Santa Cruz de Yojoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0511', N'Villanueva', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'05', N'0512', N'La Lima', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0601', N'Choluteca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0602', N'Apacilagua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0603', N'Concepción de María', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0604', N'Duyure', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0605', N'El Corpus', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0606', N'El Triunfo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0607', N'Marcovia', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0608', N'Morolica', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0609', N'Namasigüe', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0610', N'Orocuina', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0611', N'Pespire', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0612', N'San Antonio de Flores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0613', N'San IsIdro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0614', N'San José', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0615', N'San Marcos de Colón', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'06', N'0616', N'Santa Ana de Yusguare', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0701', N'Yuscarán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0702', N'Alauca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0703', N'Danlí', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0704', N'El Paraíso', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0705', N'Güinope', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0706', N'Jacaleapa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0707', N'Liure', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0708', N'Morocelí', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0709', N'Oropolí', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0710', N'Potrerillos', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
GO
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0711', N'San Antonio de Flores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0712', N'San Lucas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0713', N'San Matías', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0714', N'Soledad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0715', N'Teupasenti', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0716', N'Texiguat', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0717', N'Vado Ancho', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0718', N'Yauyupe', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'07', N'0719', N'Trojes', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0801', N'Distrito Central', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0802', N'Alubarén', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0803', N'Cedros', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0804', N'Curarén', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0805', N'El Porvenir', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0806', N'Guaimaca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0807', N'La Libertad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0808', N'La Venta', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0809', N'Lepaterique', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0810', N'Maraita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0811', N'Marale', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0812', N'Nueva Armenia', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0813', N'Ojojona', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0814', N'Orica', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0815', N'Reitoca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0816', N'Sabanagrande', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0817', N'San Antonio de Oriente', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0818', N'San Buenaventura', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0819', N'San Ignacio', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0820', N'San Juan de Flores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0821', N'San Miguelito', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0822', N'Santa Ana', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0823', N'Santa Lucía', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0824', N'Talanga', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0825', N'Tatumbla', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0826', N'Valle de Ángeles', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0827', N'Villa de San Francisco', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'08', N'0828', N'Vallecillo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0901', N'Puerto Lempira', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0902', N'Brus Laguna', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0903', N'Ahuas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0904', N'Juan Francisco Bulnes', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0905', N'Ramón Villeda Morales', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'09', N'0906', N'Wampusirpe', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1001', N'La Esperanza', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1002', N'Camasca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1003', N'Colomoncagua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1004', N'Concepción', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1005', N'Dolores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1006', N'Intibucá', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1007', N'Jesús de Otoro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1008', N'Magdalena', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1009', N'Masaguara', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1010', N'San Antonio', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1011', N'San IsIdro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1012', N'San Juan', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1013', N'San Marcos de la Sierra', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1014', N'San Miguel Guancapla', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1015', N'Santa Lucía', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1016', N'Yamaranguila', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'10', N'1017', N'San Francisco de Opalaca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'11', N'1101', N'Roatán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'11', N'1102', N'Guanaja', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'11', N'1103', N'José Santos Guardiola', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'11', N'1104', N'Utila', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1201', N'La Paz', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1202', N'Aguanqueterique', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1203', N'Cabañas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1204', N'Cane', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1205', N'Chinacla', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1206', N'Guajiquiro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1207', N'Lauterique', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1208', N'Marcala', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1209', N'Mercedes de Oriente', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1210', N'Opatoro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1211', N'San Antonio del Norte', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1212', N'San José', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1213', N'San Juan', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1214', N'San Pedro de Tutule', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1215', N'Santa Ana', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1216', N'Santa Elena', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1217', N'Santa María', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1218', N'Santiago de Puringla', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'12', N'1219', N'Yarula', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1301', N'Gracias', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1302', N'Belén', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1303', N'Candelaria', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1304', N'Cololaca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1305', N'Erandique', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1306', N'Gualcince', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1307', N'Guarita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1308', N'La Campa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1309', N'La Iguala', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1310', N'Las Flores', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1311', N'La Unión', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1312', N'La Virtud', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1313', N'Lepaera', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1314', N'Mapulaca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1315', N'Piraera', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1316', N'San Andrés', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1317', N'San Francisco', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
GO
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1318', N'San Juan Guarita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1319', N'San Manuel Colohete', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1320', N'San Rafael', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1321', N'San Sebastián', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1322', N'Santa Cruz', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1323', N'Talgua', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1324', N'Tambla', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1325', N'Tomalá', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1326', N'ValladolId', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1327', N'Virginia', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'13', N'1328', N'San Marcos de Caiquín', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1401', N'Ocotepeque', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1402', N'Belén Gualcho', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1403', N'Concepción', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1404', N'Dolores Merendón', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1405', N'FraternIdad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1406', N'La Encarnación', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1407', N'La Labor', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1408', N'Lucerna', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1409', N'Mercedes', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1410', N'San Fernando', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1411', N'San Francisco del Valle', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1412', N'San Jorge', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1413', N'San Marcos', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1414', N'Santa Fe', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1415', N'Sensenti', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'14', N'1416', N'Sinuapa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1501', N'Juticalpa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1502', N'Campamento', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1503', N'Catacamas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1504', N'Concordia', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1505', N'Dulce Nombre de Culmí', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1506', N'El Rosario', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1507', N'Esquipulas del Norte', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1508', N'Gualaco', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1509', N'Guarizama', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1510', N'Guata', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1511', N'Guayape', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1512', N'Jano', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1513', N'La Unión', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1514', N'Mangulile', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1515', N'Manto', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1516', N'Salamá', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1517', N'San Esteban', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1518', N'San Francisco de Becerra', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1519', N'San Francisco de la Paz', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1520', N'Santa María del Real', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1521', N'Silca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1522', N'Yocón', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'15', N'1523', N'Patuca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1601', N'Santa Bárbara', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1602', N'Arada', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1603', N'Atima', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1604', N'Azacualpa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1605', N'Ceguaca', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1606', N'Concepción del Norte', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1607', N'Concepción del Sur', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1608', N'Chinda', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1609', N'El Níspero', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1610', N'Gualala', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1611', N'Ilama', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1612', N'Las Vegas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1613', N'Macuelizo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1614', N'Naranjito', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1615', N'Nuevo Celilac', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1616', N'Nueva Frontera', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1617', N'Petoa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1618', N'Protección', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1619', N'Quimistán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1620', N'San Francisco de Ojuera', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1621', N'San José de las Colinas', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1622', N'San Luis', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1623', N'San Marcos', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1624', N'San Nicolás', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1625', N'San Pedro Zacapa', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1626', N'San Vicente Centenario', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1627', N'Santa Rita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'16', N'1628', N'TrinIdad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1701', N'Nacaome', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1702', N'Alianza', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1703', N'Amapala', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1704', N'Aramecina', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1705', N'CarIdad', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1706', N'Goascorán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1707', N'Langue', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1708', N'San Francisco de Coray', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'17', N'1709', N'San Lorenzo', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1801', N'Yoro', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1802', N'Arenal', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1803', N'El Negrito', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1804', N'El Progreso', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1805', N'Jocón', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1806', N'Morazán', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1807', N'Olanchito', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1808', N'Santa Rita', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1809', N'Sulaco', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1810', N'Victoria', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
INSERT [mant].[tbMunicipios] ([dept_Id], [muni_Id], [muni_Descripcion], [muni_Estado], [muni_UserCrea], [muni_FechaCrea], [muni_UserModifica], [muni_FechaModifica]) VALUES (N'18', N'1811', N'Yorito', 1, 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime), 1, CAST(N'2023-03-02T08:01:28.720' AS DateTime))
 GO
--***************************************************************/Tabla Municipios******************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Estados Civiles****************************************************************--
INSERT INTO mant.tbEstadosCiviles
(estc_Descripcion,estc_UserCrea)
VALUES
('Soltero(a)',1),
('Casado(a)',1),
('Divorciado(a)',1),
('Viudo(a)',1),
('Union Libre',1)
GO
 --***********************************************************/Tabla Estados Civiles****************************************************************--
 
------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Cargos*********************************************************************--
 INSERT INTO mant.tbCargos
 (carg_Descripcion,carg_UserCrea)
 VALUES
 ('Vendedor',1),
 ('Cajero',1),
 ('Guardia',1),
 ('Gerente General',1),
 ('Contador',1)
 GO
--****************************************************************/Tabla Cargos*********************************************************************--
 
--******************************************************************/MANT***************************************************************************--


-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------


--******************************************************************/VERA***************************************************************************--

--*************************************************************Tabla Sucursales*********************************************************************--
 INSERT INTO vera.tbSucursales
 (sucu_Nombre,muni_Id,sucu_Direccion,sucu_UserCrea)
 VALUES
 ('Jojo´s Sucursal SPS','0501','SPS',1),
 ('Jojo´s Sucursal DC','0801','Tegucigalpa',1),
 ('Jojo´s Sucursal La Ceiba','0101','La Ceiba',1)
GO
--************************************************************/Tabla Sucursales*********************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Categorias*********************************************************************--
 INSERT INTO vera.tbCategorias
 (cate_Descripcion,cate_UserCrea)
 VALUES
 ('Abrigo',1),
 ('Camisa',1),
 ('Camiseta',1),
 ('Chaqueta',1),
 ('Vestido',1),
 ('Pantalon',1),
 ('Short',1),
 ('Falda',1),
 ('Blusa',1),
 ('Calzado',1)
GO
--*************************************************************/Tabla Categorias********************************************************************--

------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Marcas*********************************************************************--
 INSERT INTO vera.tbMarcas
 (marc_Descripcion,marc_UserCrea)
 VALUES
 ('Nike',1),
 ('Vans',1),
 ('Forever21',1),
 ('Adidas',1),
 ('H&M',1),
 ('ZARA',1),
 ('Aeropostal',1),
 ('Champion',1),
 ('Levi´s',1),
 ('Old Navy',1),
 ('Converse',1),
 ('Lacoste',1),
 ('Under Armor',1)
 GO
--****************************************************************/Tabla Marcas*********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Empleados********************************************************************--
 INSERT INTO vera.tbEmpleados
 (empl_Nombres, 
  empl_ApellIdos, 
  empl_Identidad,
  empl_FechaNacimiento, 
  empl_Sexo, 
  estc_Id,
  empl_Telefeno, 
  muni_Id,
  carg_Id, 
  empl_Direccion, 
  sucu_Id, 
  empl_UserCrea)
 VALUES
 ('Jafet','Gomez', '353453453', '02-01-2005','M',1,'98129299','0501',1,'SPS',1,1),
 ('Cristian','Aguilar', '234234234234', '10-01-2005','M',1,'33201809','0501',2,'SPS',1,1),
 ('Julyssa','Medina', '3645657567', '06-01-2005','F',2,'98826754','0501',3,'Tegucigalpa',2,1),
 ('Carlos','Ruiz','354457563', '06-01-2005','M',2,'97630978','0501',4,'Tegucigalpa',2,1),
 ('Daniel','Espinoza', '686786786', '06-01-2005','M',3,'32789739','0501',5,'Tela',3,1),
 ('Chris','Aguilar', '5676785646', '06-01-2005','M',3,'56452809','0501',1,'La Ceiba',3,1)
 GO
--***************************************************************/Tabla Empleados*******************************************************************--
 
 -----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Clientes*********************************************************************--
 INSERT INTO vera.tbClientes
 (clie_Nombres, 
  clie_ApellIdos, 
  clie_Identidad,
  clie_FechaNacimiento, 
  clie_Sexo, 
  estc_Id, 
  clie_Telefeno, 
  muni_Id, 
  clie_Direccion, 
  clie_UserCrea)
 VALUES
 ('Isaac','Gomez', '4645345', '02-01-2005','M',1,'98129299','0501','SPS',1),
 ('Alexander','Aguilar', '45623424', '10-01-2005','M',1,'33201809','0501','SPS',1),
 ('Selvin','Medina', '4567576786', '06-01-2005','M',1,'98826754','0501','SPS',1),
 ('Alexa','Toledo', '8786565464', '06-01-2005','F',1,'98826754','0501','SPS',1),
 ('Lindesey','Lohan', '6879678678','06-01-2005','F',1,'98826754','0501','SPS',1)
 GO
--***************************************************************/Tabla Clientes*********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------------

--**************************************************************Tabla Descuentos*********************************************************************--
 INSERT INTO vera.tbDescuentos
 VALUES  ('Rojo', '#F80000', 50, 1,		GETDATE(), NULL, NULL, 1),
		('Amarillo', '#FECA00', 15, 1, GETDATE(), NULL, NULL, 1),
		('Naranja', '#F29A26',  10, 1,	GETDATE(), NULL, NULL, 1), 
		('Azul', '#0000FF', 40, 1,		GETDATE(), NULL, NULL, 1),
		('Verde', '#008D00', 30, 1,	GETDATE(), NULL, NULL, 1),
		('Negro', '#000000', 25, 1,	GETDATE(), NULL, NULL, 1),
		('Café', '#663300',  35, 1,	GETDATE(), NULL, NULL, 1);
		GO
--***************************************************************/Tabla Descuentos*********************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Proveedores*********************************************************************--
 INSERT INTO vera.tbProveedores
 (prov_Nombres, 
  prov_ApellIdos, 
  prov_Telefeno, 
  muni_Id, 
  prov_Direccion, 
  prov_UserCrea)
 VALUES
 ('Ulises','Menjivar','98129299','0501','SPS',1),
 ('Juan','Sagas','33201809','0501','SPS',1),
 ('Jafet','Yanez','98826754','0501','SPS',1),
 ('Esdra','Cerna','98826754','0501','SPS',1),
 ('Mágdaly','Zúniga','98826754','0501','SPS',1);
 GO
--**************************************************************/Tabla Proveedores*********************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--*****************************************************************Tabla Fardos************************************************************************--
 INSERT INTO vera.tbFardos
 VALUES ('Niño Premium', 1,			GETDATE(), NULL, NULL, 1),
		('Ropa Deportiva', 1,		GETDATE(), NULL, NULL, 1),
		('Blazers Premium', 1,		GETDATE(), NULL, NULL, 1),
		('Mixto', 1,				GETDATE(), NULL, NULL, 1),
		('Mujer Mixto', 1,			GETDATE(), NULL, NULL, 1),
		('Hombre Mixto', 1,			GETDATE(), NULL, NULL, 1);
 GO
--****************************************************************/Tabla Fardos************************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--****************************************************************Tabla Prendas************************************************************************--
INSERT INTO vera.tbPrendas
VALUES  ('Cazadora con bolsillos','S', 1, 120.00, 2, 1, 3, 'https://img.ltwebstatic.com/images3_pi/2022/06/02/1654151432d5bddc8cd2ab4c90608456ec1fa61910_thumbnail_600x.webp',						1, 1, GETDATE(), NULL, NULL, 1),
		('Abrigo de peluche ', 'M', 1, 230.00, 3, 1, 1, 'https://img.ltwebstatic.com/images3_pi/2021/09/19/163206063888a16a4ec0710f27c5082f91c88b61a7_thumbnail_600x.webp',			1, 1, GETDATE(), NULL, NULL, 1),
		('Camisa con estampado de cuadros', 'L', 2, 100.00, 2, 2, 2, 'https://img.ltwebstatic.com/images3_pi/2022/10/13/1665650496d3e572d7bf9cbf2e1b442c0c288120fa_thumbnail_600x.webp',				1, 1, GETDATE(), NULL, NULL, 1),
		('Camisa de color combinado', 'S', 2, 150.00, 10, 2, 3, 'https://img.ltwebstatic.com/images3_pi/2023/01/09/16732519016575d27fcb58ebd8b0d14d2ca5713c10_thumbnail_600x.webp',											1, 1, GETDATE(), NULL, NULL, 1),
		('Camiseta con estampado slogan ', 'XS', 3, 450.00, 5, 3, 5, 'https://img.ltwebstatic.com/images3_pi/2023/02/01/1675238027d7de2502dde1553cc6cd2e58ba894c75_thumbnail_600x.webp',								1, 1, GETDATE(), NULL, NULL, 1),
		('Camiseta de dibujos animados', 'L', 3, 100.00, 4, 3, 4,'https://img.ltwebstatic.com/images3_pi/2022/11/17/1668672213eb593e1a2a3ac007680a4bf068ebd398_thumbnail_600x.webp',							1, 1, GETDATE(), NULL, NULL, 1),
		('Cazadora de universidad ', 'M', 4, 500.00, 3, 3, 2, 'https://img.ltwebstatic.com/images3_pi/2022/12/05/1670211040fe8fd4d85c315c22c94246fd450af658_thumbnail_405x552.jpg',													1, 1, GETDATE(), NULL, NULL, 1),
		('Vestido smock ', 'S', 4, 500.00, 8, 4, 2, 'https://img.ltwebstatic.com/images3_pi/2023/02/14/1676340888fdb8ed97794ce40ac1e86cbdd5825309_thumbnail_600x.webp',		1, 1, GETDATE(), NULL, NULL, 1),
		('Vestido con cinturón', 'XS', 7, 200.00, 7, 4, 3, 'https://img.ltwebstatic.com/images3_pi/2022/04/18/16502480808bc9410df8b3339d2c53e162a2ab8c63_thumbnail_600x.webp',						1, 1, GETDATE(), NULL, NULL, 1),
		('Pantalones cargo con estampado ', 'S', 6, 150.00, 5, 5, 2, 'https://img.ltwebstatic.com/images3_pi/2022/08/29/1661758713ea2c4fac513c936d49651c8dc53aba66_thumbnail_600x.webp',					1, 1, GETDATE(), NULL, NULL, 1),
		('Pantalones acampanados unicolor', 'L', 6,  200.00, 4, 5, 4, 'https://img.ltwebstatic.com/images3_pi/2021/07/12/16260538828be59d10a0001200b1269cb905dfa747_thumbnail_600x.webp',									1, 1, GETDATE(), NULL, NULL, 1),
		('Short bajo con abertura', 'M', 5, 70.00, 11, 6, 4, 'https://img.ltwebstatic.com/images3_pi/2021/07/15/1626330467342689c952b9e1edbe70dc2eb3dfc4ab_thumbnail_600x.webp',											1, 1, GETDATE(), NULL, NULL, 1),
		('Shorts deportivos de mármol', 'S', 3, 90.00, 12, 6, 3, 'https://img.ltwebstatic.com/images3_pi/2022/01/07/164153668891c3b1e4cb20a215967cf64c74f6db54_thumbnail_600x.webp',					1, 1, GETDATE(), NULL, NULL, 1),
		('Falda fruncido unicolor', 'S', 4, 120.00, 13, 7, 3, 'https://img.ltwebstatic.com/images3_pi/2022/05/26/16535643237641817084ae23f0f6fe0971c885e53a_thumbnail_600x.webp',											1, 1, GETDATE(), NULL, NULL, 1),
		('Falda en mezclilla ', 'XS', 7, 230.00, 1, 7, 1, 'https://img.ltwebstatic.com/images3_pi/2023/02/01/167523805095e48c1dbdf81289f666b4c969f6d0eb_thumbnail_600x.webp',		1, 1, GETDATE(), NULL, NULL, 1),
		('Camisa sin manga ', 'M',5,  200.00, 8, 8, 1, 'https://img.ltwebstatic.com/images3_pi/2023/02/20/16768554068ed78d0c27cc448c7e8eedaedae05990_thumbnail_600x.webp',						1, 1, GETDATE(), NULL, NULL, 1),
		('Blusa dorado ', 'S', 3, 100.00, 1, 8, 2, 'https://img.ltwebstatic.com/images3_pi/2022/04/15/164999304495626cec8cd867e16fe3abb12c999fa5_thumbnail_600x.webp',						1, 1, GETDATE(), NULL, NULL, 1),
		('Niños Zuecos con estampado ', 'EUR23', 2, 230.00, 2, 9, 1, 'https://img.ltwebstatic.com/images3_pi/2022/06/01/1654047477ed38d15bb074568bc1688c27ee464b81_thumbnail_600x.webp',	1, 1, GETDATE(), NULL, NULL, 1),
		('Zapatillas deportivas ', 'EUR43', 5, 230.00, 3, 9, 1, 'https://img.ltwebstatic.com/images3_pi/2022/11/08/16678925783c4d86a05454d421619f293cdd4ce2b8_thumbnail_600x.webp', 1 ,1, GETDATE(), NULL, NULL, 1);
 GO
--***************************************************************/Tabla Prendas************************************************************************--

---------------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Métodos de Pago********************************************************************--
 INSERT INTO fact.tbMetodosPagos
 VALUES  ('Tarjeta de Crédito',			1, GETDATE(), NULL, NULL, 1),
 		('Tarjeta de Débito',			1, GETDATE(), NULL, NULL, 1),
 		('Paypal',						1, GETDATE(), NULL, NULL, 1),
 		('Tranferencia Electrónica',	1, GETDATE(), NULL, NULL, 1),
 		('Efectivo',					1, GETDATE(), NULL, NULL, 1),
 		('Cuerpo',						1, GETDATE(), NULL, NULL, 1);
 GO
--**********************************************************/Tabla Métodos de Pago********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***************************************************************Tabla Factura*********************************************************************--
 INSERT INTO fact.tbFacturas
 VALUES  (2, 1, GETDATE(), 2, 1, 1,GETDATE(), NULL, NULL),
		 (1, 3, GETDATE(), 3, 1, 1,GETDATE(), NULL, NULL),
		 (4, 5, GETDATE(), 1, 1, 1,GETDATE(), NULL, NULL);
 GO
--**************************************************************/Tabla Factura*********************************************************************--

-----------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Factura Detalle*****************************************************************--
 INSERT INTO fact.tbFacturaDetalles
 VALUES  (1, 12, 1, 0.00, 1,GETDATE(), NULL, NULL, 1),
		 (1, 3, 1, 0.00, 1, GETDATE(), NULL, NULL, 1),
		 (2, 8, 1, 0.00, 1, GETDATE(), NULL, NULL, 1),
		 (2, 13, 1, 0.00, 1, GETDATE(), NULL, NULL, 1),
		 (3, 5, 1, 0.00, 1, GETDATE(), NULL, NULL, 1),
		 (3, 3, 1, 0.00, 1, GETDATE(), NULL, NULL, 1);
 GO
--**********************************************************/Tabla Factura Detalle*****************************************************************--

--******************************************************************/VERA**************************************************************************--

--*****************************************************************/INSERTS************************************************************************--
