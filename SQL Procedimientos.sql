--**********************************************************PROCEDIMIENTOS*********************************************************************--
USE db_VERA
GO

--*****************************************************************ACCE************************************************************************--
--**************************************************************Tabla Roles********************************************************************--
CREATE OR ALTER PROC acce.UDP_tbRoles_INDEX
AS BEGIN

SELECT * FROM acce.VW_Roles
WHERE role_Estado = 1;

END
GO

CREATE OR ALTER PROC acce.UDP_tbRoles_FIND
@role_Id INT
AS BEGIN

SELECT * FROM acce.tbRoles 
WHERE role_Id = @role_Id;

END
GO

CREATE OR ALTER PROC acce.UDP_tbRoles_INSERT
@role_Descripcion NVARCHAR(100),
@role_UserCrea INT
AS BEGIN

	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM acce.tbRoles WHERE role_Descripcion = @role_Descripcion AND role_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Rol ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM acce.tbRoles WHERE role_Descripcion = @role_Descripcion)
		 BEGIN
			


			INSERT INTO acce.tbRoles
			(role_Descripcion, role_UserCrea)
			VALUES
			(@role_Descripcion, @role_UserCrea)

			DECLARE @id INT= (SELECT CAST(IDENT_CURRENT('acce.tbRoles')AS INT))
			DECLARE @Rol NVARCHAR(MAX) = (SELECT role_Descripcion FROM acce.tbRoles WHERE role_Id = @id)

			SELECT 200 AS codeStatus, 'Rol Creado con éxito' AS messageStatus
			UNION ALL
			SELECT @id,@Rol

		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC acce.UDP_tbRoles_UPDATE
@role_Id INT,
@role_Descripcion NVARCHAR(100),
@role_UserModifica INT
AS BEGIN

	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM acce.tbRoles WHERE role_Descripcion = @role_Descripcion AND role_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Rol ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM acce.tbRoles WHERE role_Descripcion = @role_Descripcion)
		 BEGIN
			


	UPDATE acce.tbRoles
	SET role_Descripcion	= @role_Descripcion,
		role_UserModifica	= @role_UserModifica
		WHERE role_Id = @role_Id

			SELECT 200 AS codeStatus, 'Rol Modificado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC acce.UDP_tbRoles_DELETE
@role_Id INT
AS BEGIN

	BEGIN TRY
			UPDATE acce.tbRoles
			SET
				role_Estado		=	0
				WHERE role_Id	=	@role_Id

			SELECT 200 AS codeStatus, 'Rol Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--*************************************************************/Tabla Roles********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Pantallas*****************************************************************--
CREATE OR ALTER PROC acce.UDP_tbPantallas_INDEX
AS BEGIN

SELECT * FROM acce.tbPantallas
WHERE pant_Estado = 1;

END
GO

CREATE OR ALTER PROC acce.UDP_tbPantallas_FIND
@pant_Id INT
AS BEGIN

SELECT * FROM acce.VW_Pantallas
WHERE pant_Id = @pant_Id;

END
GO

CREATE OR ALTER PROC acce.UDP_tbPantallas_INSERT
@pant_Nombre NVARCHAR(100),
@pant_Identificador CHAR(8),
@pant_Href NVARCHAR(70),
@pant_UserCrea INT
AS BEGIN

	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM acce.tbPantallas WHERE pant_Nombre = @pant_Nombre OR pant_Identificador = @pant_Identificador OR pant_href = @pant_Href AND pant_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'La Pantalla ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM acce.tbPantallas WHERE pant_Nombre = @pant_Nombre OR pant_Identificador = @pant_Identificador OR pant_href = @pant_Href)
		 BEGIN
			


			INSERT INTO acce.tbPantallas
			(pant_Nombre, pant_Identificador, pant_href, pant_UserCrea)
			VALUES
			(@pant_Nombre, @pant_Identificador, @pant_Href, @pant_UserCrea)

			SELECT 200 AS codeStatus, 'Pantalla Creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC acce.UDP_tbPantallas_UPDATE
@pant_Id INT,
@pant_Nombre NVARCHAR(100),
@pant_Identificador CHAR(8),
@pant_Href NVARCHAR(70),
@pant_UserModifica INT
AS BEGIN

	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM acce.tbPantallas WHERE pant_Nombre = @pant_Nombre OR pant_Identificador = @pant_Identificador OR pant_href = @pant_Href AND pant_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'La Pantalla ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM acce.tbPantallas WHERE pant_Nombre = @pant_Nombre OR pant_Identificador = @pant_Identificador OR pant_href = @pant_Href)
		 BEGIN
			

	UPDATE acce.tbPantallas
	SET pant_Nombre	= @pant_Nombre,
		pant_Identificador	= @pant_Identificador,
		pant_href =  @pant_Href
		WHERE pant_Id=@pant_Id

			SELECT 200 AS codeStatus, 'Pantalla Modificada con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH



END
GO

CREATE OR ALTER PROC acce.UDP_tbPantallas_DELETE
@pant_Id INT
AS BEGIN

	BEGIN TRY
			UPDATE acce.tbPantallas
			SET
				pant_Estado		=	0
				WHERE pant_Id	=	@pant_Id

			SELECT 200 AS codeStatus, 'Pantalla Modificada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--************************************************************/Tabla Pantallas*****************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*********************************************************Tabla Pantallas Por Rol**************************************************************--
CREATE OR ALTER PROC acce.UDP_tbPantallasPorRol_Check 
@pant_Identificador NVARCHAR(100)
AS BEGIN

SELECT  [pantrol_Id], 
		T1.[role_Id], 
		role_Descripcion,
		T1.[pant_Id],
		pant_Nombre,
		[pantrol_Estado], 
		[pantrol_UserCrea], 
		T6.empl_Nombres + ' '+ T6.empl_ApellIdos AS empl_NombreCrea,
		[pantrol_FechaCrea], 
		T7.empl_Nombres + ' '+ T7.empl_ApellIdos AS empl_NombreModifica,
		[pantrol_UserModifica], 
		[pantrol_FechaModifica] 
		FROM acce.tbPantallasPorRol T1
		INNER JOIN acce.tbRoles T2
		ON T1.role_Id = T2.role_Id
		INNER JOIN acce.tbPantallas T3
		ON T1.pant_Id = T3.pant_Id
		INNER JOIN acce.tbUsuarios T4
		ON T1.pantrol_UserCrea = T4.user_Id
		LEFT JOIN acce.tbUsuarios T5
		ON T1.pantrol_UserModifica = T5.user_Id
		INNER JOIN vera.tbEmpleados T6
		ON T4.empl_Id = T6.empl_Id
		LEFT JOIN vera.tbEmpleados T7
		ON T5.empl_Id = T7.empl_Id
		WHERE SUBSTRING(pant_Identificador,0,5)= @pant_Identificador


END
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRol_Checked 
@role_Id INT
AS BEGIN
	SELECT Pant_Id FROM acce.tbPantallasPorRol
	WHERE role_Id = @role_Id
END

GO

CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRol_INSERT
@role_Id INT,
@pant_Id INT,
@pantrol_UserCrea INT
AS
BEGIN
	INSERT INTO [acce].[tbPantallasPorRol]
	(role_Id, pant_Id, pantrol_UserCrea)
	VALUES
	(@role_Id,@pant_Id,@pantrol_UserCrea)

	SELECT 200 AS codeStatus, 'Acceso Agregado con éxito' AS messageStatus

END

GO

CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRol_DELETE
@role_Id INT,
@pant_Id INT
AS
BEGIN
DELETE FROM  [acce].[tbPantallasPorRol]
WHERE role_Id=@role_Id AND pant_Id=@pant_Id
END
GO
--********************************************************/Tabla Pantallas Por Rol**************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Usuarios******************************************************************--
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_INDEX
AS
BEGIN
SELECT * FROM acce.VW_Usuarios
WHERE user_Estado = 1
END

GO


CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_FIND 
@user_Id					INT
AS
BEGIN
SELECT * FROM acce.VW_Usuarios
WHERE user_Id = @user_Id
END

GO

CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_INSERT
@user_NombreUsuario			NVARCHAR(200),
@empl_Id					INT,
@user_Contraseña			NVARCHAR(150),
@user_Admin					BIT,
@role_Id					INT,
@user_UserCrea				INT
AS
BEGIN
	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM acce.tbUsuarios WHERE user_NombreUsuario = @user_NombreUsuario AND user_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Nombre de Usuario ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM acce.tbUsuarios WHERE user_NombreUsuario = @user_NombreUsuario)
		 BEGIN
			
			DECLARE @Encrypt NVARCHAR(MAX) = (HASHBYTES('SHA2_512',@user_Contraseña))


			INSERT INTO acce.tbUsuarios
			(user_NombreUsuario,empl_Id, user_Contraseña, user_Admin,role_Id,user_UserCrea)
			VALUES
			(@user_NombreUsuario,@empl_Id,@Encrypt,@user_Admin,@role_Id,@user_UserCrea)

			SELECT 200 AS codeStatus, 'Usuario Creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_UPDATE
@user_Id					INT,
@empl_Id					INT,
@user_Admin					BIT,
@role_Id					INT,
@user_UserModifica			INT
AS
BEGIN
	BEGIN TRY

			UPDATE acce.tbUsuarios
			SET
				empl_Id				=	@empl_Id,
				user_Admin			=	@user_Admin,
				role_Id				=	@role_Id,
				user_UserModifica	=	@user_UserModifica
				WHERE [user_Id]		=	@user_Id

			SELECT 200 AS codeStatus, 'Usuario Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO


CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_DELETE
@user_Id					INT
AS
BEGIN
	BEGIN TRY
			UPDATE acce.tbUsuarios
			SET
				user_Estado		=	0
				WHERE [user_Id]	=	@user_Id

			SELECT 200 AS codeStatus, 'Usuario Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_LOGIN 
@user_NombreUsuario					NVARCHAR(MAX),
@user_Contraseña					NVARCHAR(MAX)
AS
BEGIN

DECLARE @Encrypt NVARCHAR(MAX) = (HASHBYTES('SHA2_512',@user_Contraseña))

SELECT * FROM acce.VW_Usuarios
WHERE user_NombreUsuario = @user_NombreUsuario AND user_Contraseña = @Encrypt
END

GO
--************************************************************/Tabla Usuarios******************************************************************--

--*****************************************************************ACCE************************************************************************--


--*****************************************************************MANT************************************************************************--
--*************************************************************Tabla Cargos********************************************************************--
CREATE OR ALTER PROC mant.UDP_tbCargos_INDEX
AS BEGIN
 
 SELECT * FROM mant.VW_Cargos
 WHERE carg_Estado = 1;

END
GO

CREATE OR ALTER PROC mant.UDP_tbCargos_FIND
(@carg_Id INT)
AS BEGIN

 SELECT * FROM mant.VW_Cargos
 WHERE carg_Id = @carg_Id;

END
GO


CREATE OR ALTER PROC mant.UDP_tbCargos_INSERT(
@carg_Descripcion NVARCHAR(100),
@carg_UserCrea INT)
AS BEGIN

	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM mant.tbCargos WHERE carg_Descripcion = @carg_Descripcion AND carg_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El cargo ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  mant.tbCargos WHERE carg_Descripcion = @carg_Descripcion)
		 BEGIN
			
			INSERT INTO  mant.tbCargos
			(carg_Descripcion, carg_UserCrea)
			VALUES
			(@carg_Descripcion, @carg_UserCrea)

			SELECT 200 AS codeStatus, 'Cargo creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO



CREATE OR ALTER PROCEDURE mant.UDP_tbCargos_UPDATE(
@carg_Id INT,
@carg_Descripcion NVARCHAR(100),
@carg_UserModifica INT)
AS
BEGIN
	BEGIN TRY

			UPDATE mant.tbCargos
			SET
				carg_Descripcion = @carg_Descripcion,
				carg_UserModifica = @carg_UserModifica
				WHERE carg_Id		=	@carg_Id

			SELECT 200 AS codeStatus, 'Cargo Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROCEDURE mant.UDP_tbCargos_DELETE
@carg_Id					INT
AS
BEGIN
	BEGIN TRY
			UPDATE mant.tbCargos
			SET
				carg_Estado		=	0
				WHERE carg_Id	=	@carg_Id

			SELECT 200 AS codeStatus, 'Cargo Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO



--************************************************************/Tabla Cargos********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--********************************************************/Tabla Departamentos*****************************************************************--
CREATE OR ALTER PROC mant.UDP_tbDepartamentos_INDEX
AS BEGIN

 SELECT * FROM mant.VW_Departamentos
 WHERE dept_Estado = 1;

END
GO

CREATE OR ALTER PROC mant.UDP_tbDepartamentos_FIND
@dept_Id CHAR(2)
AS BEGIN

 SELECT * FROM mant.VW_Departamentos
 WHERE dept_Id = @dept_Id;

END
GO

CREATE OR ALTER PROC mant.UDP_tbDepartamentos_INSERT
@dept_Id CHAR(2),
@dept_Descripcion NVARCHAR(100),
@dept_UserCrea INT
AS BEGIN

 	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM mant.tbDepartamentos WHERE dept_Id = @dept_Id AND dept_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Departamento ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  mant.tbDepartamentos WHERE dept_Id = @dept_Id)
		 BEGIN
			
			INSERT INTO  mant.tbDepartamentos
			(dept_Id, dept_Descripcion, dept_UserCrea)
			VALUES
			(@dept_Id, @dept_Descripcion, @dept_UserCrea)

			SELECT 200 AS codeStatus, 'Departamento creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC mant.UDP_tbDepartamentos_UPDATE
@dept_Id CHAR(2),
@dept_Descripcion NVARCHAR(100),
@dept_UserModifica INT
AS BEGIN

 	BEGIN TRY

			UPDATE mant.tbDepartamentos
			SET
				dept_Descripcion = @dept_Descripcion,
				dept_UserModifica = @dept_UserModifica
				WHERE dept_Id		=	@dept_Id

			SELECT 200 AS codeStatus, 'Departamento Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC mant.UDP_tbDepartamentos_DELETE
@dept_Id CHAR(2)
AS BEGIN

 	BEGIN TRY
			UPDATE mant.tbDepartamentos
			SET
				dept_Estado		=	0
				WHERE dept_Id	=	@dept_Id

			SELECT 200 AS codeStatus, 'Departamento Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--********************************************************/Tabla Departamentos*****************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--******************************************************/Tabla Estados Civiles*****************************************************************--
CREATE OR ALTER PROC mant.UDP_tbEstadosCiviles_INDEX
AS BEGIN

 SELECT * FROM mant.VW_EstadosCiviles
 WHERE estc_Estado = 1;

END
GO

CREATE OR ALTER PROC mant.UDP_tbEstadosCiviles_FIND
@estc_Id INT
AS BEGIN

 SELECT * FROM mant.VW_EstadosCiviles
 WHERE estc_Id = @estc_Id;

END
GO

CREATE OR ALTER PROC mant.UDP_tbEstadosCiviles_INSERT
@estc_Descripcion NVARCHAR(100),
@estc_UserCrea INT
AS BEGIN

 	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM mant.tbEstadosCiviles WHERE estc_Descripcion = @estc_Descripcion AND estc_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Estado Civil ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  mant.tbEstadosCiviles WHERE estc_Descripcion = @estc_Descripcion)
		 BEGIN
			
			INSERT INTO  mant.tbEstadosCiviles
			(estc_Descripcion, estc_UserCrea)
			VALUES
			(@estc_Descripcion, @estc_UserCrea)

			SELECT 200 AS codeStatus, 'Estado Civil creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO

CREATE OR ALTER PROC mant.UDP_tbEstadosCiviles_UPDATE
@estc_Id INT,
@estc_Descripcion NVARCHAR(100),
@estc_UserModifica INT
AS BEGIN

  	BEGIN TRY

			UPDATE mant.tbEstadosCiviles
			SET
				estc_Descripcion = @estc_Descripcion,
				estc_UserModifica = @estc_UserModifica
				WHERE estc_Id		=	@estc_Id

			SELECT 200 AS codeStatus, 'Estado Civil Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC mant.UDP_tbEstadosCiviles_DELETE
@estc_Id INT
AS BEGIN

  	BEGIN TRY
			UPDATE mant.tbEstadosCiviles
			SET
				estc_Estado		=	0
				WHERE estc_Id	=	@estc_Id

			SELECT 200 AS codeStatus, 'Estado Civil Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--******************************************************/Tabla Estados Civiles*****************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*********************************************************Tabla Municipios********************************************************************--
CREATE OR ALTER PROC mant.UDP_tbMunicipios_INDEX
AS BEGIN

 SELECT * FROM mant.VW_Municipios
 WHERE muni_Estado = 1;

END
GO

CREATE OR ALTER PROC mant.UDP_tbMunicipios_FILTER
@dept_Id INT
AS BEGIN

SELECT * FROM mant.VW_Municipios
WHERE dept_Id = @dept_Id

END
GO


CREATE OR ALTER PROC mant.UDP_tbMunicipios_FIND
@muni_Id CHAR(4)
AS BEGIN

 SELECT * FROM mant.VW_Municipios
 WHERE muni_Id = @muni_Id;

END
GO

CREATE OR ALTER PROC mant.UDP_tbMunicipios_INSERT
@muni_Id CHAR(4),
@muni_Descripcion NVARCHAR(100),
@dept_Id CHAR(2),
@muni_UserCrea INT
AS BEGIN

 	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM mant.tbMunicipios WHERE muni_Descripcion = @muni_Descripcion OR muni_Id = @muni_Id AND muni_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El Municipio ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  mant.tbMunicipios WHERE muni_Descripcion = @muni_Descripcion  OR muni_Id = @muni_Id)
		 BEGIN
			
			INSERT INTO  mant.tbMunicipios
			(muni_Id, dept_Id, muni_Descripcion, muni_UserCrea)
			VALUES
			(@muni_Id, @dept_Id, @muni_Descripcion, @muni_UserCrea)

			SELECT 200 AS codeStatus, 'Municipio creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC mant.UDP_tbMunicipios_UPDATE
@muni_Id CHAR(4),
@muni_Descripcion NVARCHAR(100),
@dept_Id CHAR(2),
@muni_UserModifica INT
AS BEGIN

   	BEGIN TRY

			UPDATE mant.tbMunicipios
			SET
			muni_Id = @muni_Id,
				muni_Descripcion = @muni_Descripcion,
				dept_Id = @dept_Id,
				muni_UserModifica = @muni_UserModifica
				WHERE muni_Id		=	@muni_Id

			SELECT 200 AS codeStatus, 'Municipio Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC mant.UDP_tbMunicipios_DELETE
@muni_Id CHAR(4) 
AS BEGIN

   	BEGIN TRY
			UPDATE mant.tbMunicipios
			SET
				muni_Estado		=	0
				WHERE muni_Id	=	@muni_Id

			SELECT 200 AS codeStatus, 'Municipio Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--********************************************************/Tabla Municipios********************************************************************--

--****************************************************************/MANT************************************************************************--



-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------



--*****************************************************************VERA************************************************************************--


--*********************************************************Tabla Categorias********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbCategorias_INDEX
AS BEGIN

 SELECT * FROM vera.tbCategorias
 WHERE cate_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbCategorias_FIND
@cate_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Categorias 
 WHERE cate_Id = @cate_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbCategorias_INSERT
@cate_Descripcion NVARCHAR(100),
@cate_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbCategorias WHERE cate_Descripcion = @cate_Descripcion AND cate_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'La Categoría ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbCategorias WHERE cate_Descripcion = @cate_Descripcion)
		 BEGIN
			
			INSERT INTO  vera.tbCategorias
			(cate_Descripcion, cate_UserCrea)
			VALUES
			(@cate_Descripcion, @cate_UserCrea)

			SELECT 200 AS codeStatus, 'Categoría creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbCategorias_UPDATE
@cate_Id INT,
@cate_Descripcion NVARCHAR(100),
@cate_UserModifica INT
AS BEGIN

   	BEGIN TRY

			UPDATE vera.tbCategorias
			SET
				cate_Descripcion = @cate_Descripcion,
				cate_UserModifica = @cate_UserModifica
				WHERE cate_Id		=	@cate_Id

			SELECT 200 AS codeStatus, 'Categoría Modificada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbCategorias_DELETE
@cate_Id INT
AS BEGIN

   	BEGIN TRY
			UPDATE vera.tbCategorias
			SET
				cate_Estado		=	0
				WHERE cate_Id	=	@cate_Id

			SELECT 200 AS codeStatus, 'Categoría Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--********************************************************/Tabla Categorias********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Clientes********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbClientes_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Clientes
  WHERE clie_Estado = 1;

END
GO
CREATE OR ALTER PROC vera.UDP_tbClientes_FIND
@clie_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Clientes
 WHERE clie_Id = @clie_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbClientes_INSERT
@clie_Nombres NVARCHAR(100),
@clie_Apellidos NVARCHAR(100),
@clie_Identidad NVARCHAR(25),
@clie_FechaNacimiento DATE,
@clie_Sexo CHAR(1),
@estc_Id INT,
@clie_Telefono NVARCHAR(25),
@muni_Id CHAR(4),
@clie_Direccion NVARCHAR(100),
@clie_UserCrea INT
AS BEGIN

   	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbClientes WHERE clie_Identidad = @clie_Identidad AND clie_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El número de identidad del cliente ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbClientes WHERE clie_Identidad = @clie_Identidad)
		 BEGIN
			
			INSERT INTO  vera.tbClientes
			(clie_Nombres, clie_ApellIdos, clie_Identidad, clie_FechaNacimiento, clie_Sexo, estc_Id, clie_Telefeno, muni_Id, clie_Direccion, clie_UserCrea)
			VALUES
			(@clie_Nombres, @clie_Apellidos, @clie_Identidad, @clie_FechaNacimiento, @clie_Sexo,@estc_Id, @clie_Telefono, @muni_Id, @clie_Direccion, @clie_UserCrea)

			SELECT 200 AS codeStatus, 'Cliente creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbClientes_UPDATE
@clie_Id INT,
@clie_Nombres NVARCHAR(100),
@clie_Apellidos NVARCHAR(100),
@clie_Identidad NVARCHAR(25),
@clie_FechaNacimiento DATE,
@clie_Sexo CHAR(1),
@estc_Id INT,
@clie_Telefono NVARCHAR(25),
@muni_Id CHAR(4),
@clie_Direccion NVARCHAR(100),
@clie_UserModifica INT
AS BEGIN

 
   	BEGIN TRY

			
					UPDATE vera.tbClientes
			SET
				clie_Nombres = @clie_Nombres,
				clie_ApellIdos = @clie_Apellidos,
				clie_Identidad = @clie_Identidad,
				clie_FechaNacimiento = @clie_FechaNacimiento,
				clie_Sexo = @clie_Sexo,
				estc_Id = @estc_Id,
				clie_Telefeno = @clie_Telefono,
				muni_Id = @muni_Id,
				clie_Direccion = @clie_Direccion,
				clie_UserModifica = @clie_UserModifica
				WHERE clie_Id		=	@clie_Id

			SELECT 200 AS codeStatus, 'Cliente Modificado con éxito' AS messageStatus



	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbClientes_DELETE
@clie_Id INT
AS BEGIN
	
    	BEGIN TRY
			UPDATE vera.tbClientes
			SET
				clie_Estado		=	0
				WHERE clie_Id	=	@clie_Id

			SELECT 200 AS codeStatus, 'Cliente Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--**********************************************************/Tabla Clientes********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*********************************************************Tabla Descuentos********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbDescuentos_INDEX
AS BEGIN

 SELECT * FROM vera.tbDescuentos
 WHERE desc_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbDescuentos_FIND
@desc_Id INT
AS BEGIN

 SELECT * FROM vera.tbDescuentos
 WHERE desc_Id = @desc_Id

END
GO

CREATE OR ALTER PROC vera.UDP_tbDescuentos_INSERT
@desc_Color NVARCHAR(100),
@desc_ColorHexa NVARCHAR(100),
@desc_Descuento INT,
@desc_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbDescuentos WHERE desc_Color = @desc_Color AND desc_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El color de descuento ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbDescuentos WHERE desc_Color = @desc_Color)
		 BEGIN
			
			INSERT INTO  vera.tbDescuentos
			(desc_Color, desc_ColorHexa, desc_Descuento, desc_UserCrea)
			VALUES
			(@desc_Color, @desc_ColorHexa, @desc_Descuento, @desc_UserCrea)

			SELECT 200 AS codeStatus, 'Descuento creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO


CREATE OR ALTER PROC vera.UDP_tbDescuentos_UPDATE
@desc_Id INT,
@desc_Color NVARCHAR(100),
@desc_ColorHexa NVARCHAR(100),
@desc_Descuento INT,
@desc_UserModifica INT
AS BEGIN

 
   	BEGIN TRY

			UPDATE vera.tbDescuentos
			SET
				desc_Color = @desc_Color,
				desc_ColorHexa = @desc_ColorHexa,
				desc_Descuento = @desc_Descuento,
				desc_UserModificacion = @desc_UserModifica
				WHERE desc_Id		=	@desc_Id

			SELECT 200 AS codeStatus, 'Descuento Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbDescuentos_DELETE
@desc_Id INT
AS BEGIN

   	BEGIN TRY
			UPDATE vera.tbDescuentos
			SET
				desc_Estado		=	0
				WHERE desc_Id	=	@desc_Id

			SELECT 200 AS codeStatus, 'Descuento Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--********************************************************/Tabla Descuentos********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--**********************************************************Tabla Empleados********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbEmpleados_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Empleados
 WHERE empl_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbEmpleados_FIND
@empl_Id INT
AS BEGIN
 
 SELECT * FROM vera.VW_Empleados
 WHERE empl_Id = @empl_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbEmpleados_INSERT
@empl_Nombres NVARCHAR(100),
@empl_Apellidos NVARCHAR(100),
@empl_Identidad NVARCHAR(25),
@empl_FechaNacimiento DATE,
@empl_Sexo CHAR(1),
@estc_Id INT,
@empl_Telefono NVARCHAR(25),
@muni_Id CHAR(4),
@carg_Id INT,
@sucu_Id INT,
@empl_Direccion NVARCHAR(100),
@empl_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbEmpleados WHERE empl_Identidad = @empl_Identidad AND empl_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El número de identidad del empleado ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbEmpleados WHERE empl_Identidad = @empl_Identidad)
		 BEGIN
			
			INSERT INTO  vera.tbEmpleados
			(empl_Nombres, empl_ApellIdos, empl_Identidad, empl_FechaNacimiento, empl_Sexo, estc_Id, empl_Telefeno, muni_Id, carg_Id, sucu_Id, empl_Direccion, empl_UserCrea)
			VALUES
	       (@empl_Nombres, @empl_Apellidos, @empl_Identidad, @empl_FechaNacimiento, @empl_Sexo, @estc_Id, @empl_Telefono, @muni_Id, @carg_Id, @sucu_Id, @empl_Direccion, @empl_UserCrea)

			SELECT 200 AS codeStatus, 'Empleado creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC vera.UDP_tbEmpleados_UPDATE
@empl_Id INT,
@empl_Nombres NVARCHAR(100),
@empl_Apellidos NVARCHAR(100),
@empl_Identidad NVARCHAR(25),
@empl_FechaNacimiento DATE,
@empl_Sexo CHAR(1),
@estc_Id INT,
@empl_Telefono NVARCHAR(25),
@muni_Id CHAR(4),
@carg_Id INT,
@sucu_Id INT,
@empl_Direccion NVARCHAR(100),
@empl_UserModifica INT
AS BEGIN

 

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbEmpleados WHERE empl_Identidad = @empl_Identidad AND empl_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El número de identidad del empleado ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbEmpleados WHERE empl_Identidad = @empl_Identidad)
		 BEGIN
			
			UPDATE vera.tbEmpleados
			SET
				empl_Nombres = @empl_Nombres,
				empl_ApellIdos = @empl_Apellidos,
				empl_Identidad = @empl_Identidad,
				empl_FechaNacimiento = @empl_FechaNacimiento,
				empl_Sexo = @empl_Sexo,
				estc_Id = @estc_Id,
				empl_Telefeno = @empl_Telefono,
				muni_Id = @muni_Id,
				carg_Id = @carg_Id,
				sucu_Id = @sucu_Id,
				empl_Direccion = @empl_Direccion,
				empl_UserModifica = @empl_UserModifica

				WHERE empl_Id =	@empl_Id

			SELECT 200 AS codeStatus, 'Empleado Modificada con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbEmpleados_DELETE
@empl_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE vera.tbEmpleados
			SET
				empl_Estado		=	0
				WHERE empl_Id	=	@empl_Id

			SELECT 200 AS codeStatus, 'Empleado Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO
--*********************************************************/Tabla Empleados********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Fardos**********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbFardos_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Fardos
 WHERE fard_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardos_FIND
@fard_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Fardos
 WHERE fard_Id = @fard_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardos_INSERT
@fard_Descripcion NVARCHAR(100),
@fard_UserCrea INT
AS BEGIN

   	BEGIN TRY

			
			INSERT INTO  vera.tbFardos
			(fard_Descripcion, fard_UserCrea)
			VALUES
			(@fard_Descripcion, @fard_UserCrea)

			SELECT 200 AS codeStatus, 'Fardo creado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardos_UPDATE
@fard_Id INT,
@fard_Descripcion NVARCHAR(100),
@fard_UserModifica INT
AS BEGIN

   	BEGIN TRY

			
			UPDATE vera.tbFardos
			SET 
				fard_Descripcion = @fard_Descripcion,
				fard_UserModificacion = @fard_UserModifica
				WHERE fard_Id = @fard_Id
			SELECT 200 AS codeStatus, 'Fardo Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO

CREATE OR ALTER PROC vera.UDP_tbFardos_DELETE
@fard_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE vera.tbFardos
			SET
				fard_Estado		=	0
				WHERE fard_Id	=	@fard_Id

			SELECT 200 AS codeStatus, 'Fardo Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--**********************************************************/Tabla Fardos**********************************************************************--


--*****************************************************Tabla Fardos por Proveedor**************************************************************--
CREATE OR ALTER PROC vera.UDP_tbFardosProveedor_INDEX
AS BEGIN

 SELECT * FROM vera.VW_FardosProveedores
 WHERE fapr_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardosProveedor_FIND
@fapr_Id INT
AS BEGIN

 SELECT * FROM vera.VW_FardosProveedores
 WHERE fapr_Estado = @fapr_Id

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardosProveedor_INSERT
@fard_Id INT,
@prov_Id INT,
@fapr_UserCrea INT
AS BEGIN
 
   	BEGIN TRY

			INSERT INTO  vera.tbFardosProveedor
			(fard_Id, prov_Id, fapr_UserCrea)
			VALUES
			(@fard_Id, @prov_Id, @fapr_UserCrea)

			SELECT 200 AS codeStatus, 'Fardo por Proveedor creado con éxito' AS messageStatus
	

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardosProveedor_UPDATE
@fapr_Id INT,
@fard_Id INT,
@prov_Id INT,
@fapr_UserCrea INT
AS BEGIN

    	BEGIN TRY

			UPDATE vera.tbFardosProveedor
			SET
				fard_Id = @fard_Id,
				prov_Id = @prov_Id,
				fapr_UserCrea = @fapr_UserCrea
				WHERE fapr_Id		=	@fapr_Id

			SELECT 200 AS codeStatus, 'Fardo por Proveedor Modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbFardosProveedor_DELETE
@fapr_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE vera.tbFardosProveedor
			SET
				fapr_Estado		=	0
				WHERE fapr_Id	=	@fapr_Id

			SELECT 200 AS codeStatus, 'Fardop por Proveedor Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--****************************************************/Tabla Fardos por Proveedor**************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--************************************************************Tabla Marcas ********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbMarcas_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Marcas
 WHERE marc_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbMarcas_FIND
@marc_Id INT
AS BEGIN

SELECT * FROM vera.VW_Marcas
WHERE marc_Id = @marc_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbMarcas_INSERT
@marc_Descripcion NVARCHAR(100),
@marc_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbMarcas WHERE marc_Descripcion = @marc_Descripcion AND marc_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'La marca ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbMarcas WHERE marc_Descripcion = @marc_Descripcion)
		 BEGIN
			
			INSERT INTO  vera.tbMarcas
			(marc_Descripcion, marc_UserCrea)
			VALUES
			(@marc_Descripcion, @marc_UserCrea)

			SELECT 200 AS codeStatus, 'Marca creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbMarcas_UPDATE
@marc_Id INT,
@marc_Descripcion NVARCHAR(100),
@marc_UserModifica INT
AS BEGIN

   	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbMarcas WHERE marc_Descripcion = @marc_Descripcion AND marc_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'La Marca ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbMarcas WHERE marc_Descripcion = @marc_Descripcion)
		 BEGIN
			
			UPDATE vera.tbMarcas
			SET
				marc_Descripcion = @marc_Descripcion,
				marc_UserModifica = @marc_UserModifica

				WHERE marc_Id =	@marc_Id

			SELECT 200 AS codeStatus, 'Marca Modificada con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC vera.UDP_tbMarcas_DELETE
@marc_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE vera.tbMarcas
			SET
				marc_Estado		=	0
				WHERE marc_Id	=	@marc_Id

			SELECT 200 AS codeStatus, 'Marca Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--***********************************************************/Tabla Marcas ********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--************************************************************Tabla Prendas********************************************************************--
CREATE OR ALTER PROC vera.UDP_tbPrendas_INDEX
AS BEGIN

SELECT * FROM vera.VW_Prendas
WHERE pren_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbPrendas_FIND
@pren_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Prendas
 WHERE pren_Id = @pren_Id;
END
GO

CREATE OR ALTER PROC vera.UDP_tbPrendas_INSERT
@pren_Descripcion NVARCHAR(100),
@pren_Talla NVARCHAR(100),
@desc_Id INT,
@pren_Precio DECIMAL(8,2),
@marc_Id INT,
@cate_Id INT,
@fard_Id INT,
@pren_Imagen NVARCHAR(100),
@pren_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbPrendas WHERE pren_Descripcion = @pren_Descripcion AND pren_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El nombre de la prenda ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbPrendas WHERE pren_Descripcion = @pren_Descripcion)
		 BEGIN
			
			INSERT INTO  vera.tbPrendas
			(pren_Descripcion, pren_Talla, desc_Id, pren_Precio, marc_Id, cate_Id, fard_Id, pren_Imagen, pren_UserCrea)
			VALUES
			(@pren_Descripcion, @pren_Talla, @desc_Id, @pren_Precio, @marc_Id, @cate_Id, @fard_Id, @pren_Imagen, @pren_UserCrea)

			SELECT 200 AS codeStatus, 'Prenda creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbPrendas_UPDATE
@pren_Id INT,
@pren_Descripcion NVARCHAR(100),
@pren_Talla NVARCHAR(100),
@desc_Id INT,
@pren_Precio DECIMAL(8,2),
@marc_Id INT,
@cate_Id INT,
@fard_Id INT,
@pren_Imagen NVARCHAR(100),
@pren_UserModifica INT
AS BEGIN

  	BEGIN TRY


			
			UPDATE vera.tbPrendas
			SET
				pren_Descripcion = @pren_Descripcion,
				pren_Talla = @pren_Talla,
				desc_Id = @desc_Id,
				pren_Precio = @pren_Precio,
				marc_Id = @marc_Id,
				cate_Id = @cate_Id,
				fard_Id = @fard_Id,
				pren_Imagen = @pren_Imagen,
				pren_UserModificacion = @pren_UserModifica

				WHERE pren_Id =	@pren_Id

			SELECT 200 AS codeStatus, 'Prenda Modificada con éxito' AS messageStatus
		

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC vera.UDP_tbPrendas_DELETE
@pren_Id INT
AS BEGIN

     	BEGIN TRY
			UPDATE vera.tbPrendas
			SET
				pren_Estado		=	0
				WHERE pren_Id	=	@pren_Id

			SELECT 200 AS codeStatus, 'Prenda Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbPrendas_ACTIVAR
@pren_Id INT
AS BEGIN

     	BEGIN TRY
			UPDATE vera.tbPrendas
			SET
				pren_Estado		=	1
				WHERE pren_Id	=	@pren_Id

			SELECT 200 AS codeStatus, 'Prenda Activada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--***********************************************************/Tabla Prendas********************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--**********************************************************Tabla Proveedores******************************************************************--
CREATE OR ALTER PROC vera.UDP_tbProveedores_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Proveedores
 WHERE prov_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbProveedores_FIND
@prov_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Proveedores
 WHERE prov_Id = @prov_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbProveedores_INSERT
@prov_Nombres NVARCHAR(100),
@prov_Apellidos NVARCHAR(100),
@prov_Telefono VARCHAR(25),
@muni_Id CHAR(4),
@prov_Direccion NVARCHAR(100),
@prov_UserCrea INT
AS BEGIN

   	BEGIN TRY

			
			INSERT INTO  vera.tbProveedores
			(prov_Nombres, prov_ApellIdos, prov_Telefeno, muni_Id, prov_Direccion, prov_UserCrea)
			VALUES
			(@prov_Nombres, @prov_Apellidos, @prov_Telefono, @muni_Id, @prov_Direccion, @prov_UserCrea)

			SELECT 200 AS codeStatus, 'Proveedor creado con éxito' AS messageStatus
	

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbProveedores_UPDATE
@prov_Id INT,
@prov_Nombres NVARCHAR(100),
@prov_Apellidos NVARCHAR(100),
@prov_Telefono VARCHAR(25),
@muni_Id CHAR(4),
@prov_Direccion NVARCHAR(100),
@prov_UserModifica INT
AS BEGIN

   	BEGIN TRY

			
			UPDATE vera.tbProveedores
			SET
				prov_Nombres = @prov_Nombres,
				prov_ApellIdos = @prov_Apellidos,
				prov_Telefeno = @prov_Telefono,
				muni_Id = @muni_Id,
				prov_Direccion = @prov_Direccion,
				prov_UserModifica = @prov_UserModifica

				WHERE prov_Id =	@prov_Id

			SELECT 200 AS codeStatus, 'Proveedor Modificada con éxito' AS messageStatus
	

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC vera.UDP_tbProveedores_DELETE
@prov_Id INT
AS BEGIN

     	BEGIN TRY
			UPDATE vera.tbProveedores
			SET
				prov_Estado		=	0
				WHERE prov_Id	=	@prov_Id

			SELECT 200 AS codeStatus, 'Proveedor Eliminado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--*********************************************************/Tabla Proveedores******************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--***********************************************************Tabla Sucursales******************************************************************--
CREATE OR ALTER PROC vera.UDP_tbSucursales_INDEX
AS BEGIN

 SELECT * FROM vera.VW_Sucursales
 WHERE sucu_Estado = 1;

END
GO

CREATE OR ALTER PROC vera.UDP_tbSucursales_FIND
@sucu_Id INT
AS BEGIN

 SELECT * FROM vera.VW_Sucursales
 WHERE sucu_Id = @sucu_Id;

END
GO

CREATE OR ALTER PROC vera.UDP_tbSucursales_INSERT
@sucu_Nombre NVARCHAR(100),
@muni_Id CHAR(4),
@sucu_Direcion NVARCHAR(100),
@sucu_UserCrea INT
AS BEGIN

  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM vera.tbSucursales WHERE sucu_Nombre = @sucu_Nombre AND sucu_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El nombre de la sucursal ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  vera.tbSucursales WHERE sucu_Nombre = @sucu_Nombre)
		 BEGIN
			
			INSERT INTO  vera.tbSucursales
			(sucu_Nombre, muni_Id, sucu_Direccion, sucu_UserCrea)
			VALUES
			(@sucu_Nombre, @muni_Id, @sucu_Direcion, @sucu_UserCrea)

			SELECT 200 AS codeStatus, 'Sucursal creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC vera.UDP_tbSucursales_UPDATE
@sucu_Id INT,
@sucu_Nombre NVARCHAR(100),
@muni_Id CHAR(4),
@sucu_Direcion NVARCHAR(100),
@sucu_UserModifica INT
AS BEGIN

   	BEGIN TRY

			
			UPDATE vera.tbSucursales
			SET
				sucu_Nombre = @sucu_Nombre,
				muni_Id = @muni_Id,
				sucu_Direccion = @sucu_Direcion,
				sucu_UserModifica = @sucu_UserModifica

				WHERE sucu_Id =	@sucu_Id

			SELECT 200 AS codeStatus, 'Sucursal Modificada con éxito' AS messageStatus
	

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC vera.UDP_tbSucursales_DELETE
@sucu_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE vera.tbSucursales
			SET
				sucu_Estado		=	0
				WHERE sucu_Id	=	@sucu_Id

			SELECT 200 AS codeStatus, 'Sucursal Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--**********************************************************/Tabla Sucursales******************************************************************--

--****************************************************************/VERA************************************************************************--



-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------



--*****************************************************************FACT************************************************************************--

--*********************************************************Tabla Metodos de Pago***************************************************************--
CREATE OR ALTER PROC fact.UDP_tbMetodosPagos_INDEX
AS BEGIN

 SELECT * FROM fact.VW_MetodosPagos
 WHERE meto_Estado = 1;

END
GO

CREATE OR ALTER PROC fact.UDP_tbMetodosPagos_FIND
@meto_Id INT
AS BEGIN

SELECT * FROM fact.VW_MetodosPagos
WHERE meto_Id = @meto_Id;
END
GO

CREATE OR ALTER PROC fact.UDP_tbMetodosPagos_INSERT
@meto_descripcion NVARCHAR(100),
@meto_UserCrea INT
AS BEGIN


  	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM fact.tbMetodosPagos WHERE meto_Descripcion = @meto_descripcion AND meto_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El método de pago ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM  fact.tbMetodosPagos WHERE meto_Descripcion = @meto_descripcion)
		 BEGIN
			
			INSERT INTO  fact.tbMetodosPagos
			(meto_Descripcion, meto_UserCrea)
			VALUES
			(@meto_descripcion, @meto_UserCrea)

			SELECT 200 AS codeStatus, 'Método de pago creado con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END 
GO

CREATE OR ALTER PROC fact.UDP_tbMetodosPagos_UPDATE
@meto_Id INT,
@meto_Descripcion NVARCHAR(100),
@meto_UserModifica INT
AS BEGIN

   	BEGIN TRY
	--si existe
		IF EXISTS (SELECT * FROM fact.tbMetodosPagos WHERE meto_Descripcion = @meto_descripcion AND meto_Estado  = 1)
	     BEGIN
            SELECT 409 AS codeStatus, 'El método de pago ya existe' AS messageStatus
         END
	--si no existe
		 ELSE IF NOT EXISTS (SELECT * FROM fact.tbMetodosPagos WHERE meto_Descripcion = @meto_descripcion)
		 BEGIN
			
			UPDATE fact.tbMetodosPagos
			SET
				meto_Descripcion = @meto_Descripcion,
				meto_UserModificacion = @meto_UserModifica

				WHERE meto_Id =	@meto_Id

			SELECT 200 AS codeStatus, 'Método de pago Modificada con éxito' AS messageStatus
		END

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC fact.UDP_tbMetodosPagos_DELETE
@meto_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE fact.tbMetodosPagos
			SET
				meto_Estado		=	0
				WHERE meto_Id	=	@meto_Id

			SELECT 200 AS codeStatus, 'Método de pago Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO
--********************************************************/Tabla Metodos de Pago***************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--*************************************************************Tabla Facturas******************************************************************--

CREATE OR ALTER PROC fact.UDP_tbFacturas_INDEX
AS BEGIN

 SELECT * FROM fact.VW_Facturas

END
GO

CREATE OR ALTER PROC fact.UDP_tbFacturas_FIND
@fact_Id INT
AS BEGIN


 SELECT * FROM fact.VW_Facturas 
 WHERE fact_Id = @fact_Id;

END

GO

CREATE OR ALTER PROC fact.UDP_tbFacturas_INSERT
@clie_Id INT,
@empl_Id INT,
@sucu_Id INT,
@meto_Id INT,
@fact_UserCrea INT
AS BEGIN


  	BEGIN TRY
		
			INSERT INTO  fact.tbFacturas
			(clie_Id, empl_Id, fact_Fecha, sucu_Id, meto_Id, fact_UserCrea)
			VALUES
			(@clie_Id, @empl_Id, GETDATE(), @sucu_Id, @meto_Id, @fact_UserCrea)

			SELECT 200 AS codeStatus, 'Factura creado con éxito' AS messageStatus
		

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END
GO

CREATE OR ALTER PROC fact.UDP_tbFacturas_UPDATE
@fact_Id INT,
@clie_Id INT,
@empl_Id INT,
@sucu_Id INT,
@meto_Id INT,
@fact_UserModifica INT
AS BEGIN


   	BEGIN TRY

			UPDATE fact.tbFacturas
			SET
				clie_Id = @clie_Id,
				empl_Id = @empl_Id,
				fact_Fecha = GETDATE(),
				sucu_Id = @sucu_Id,
			    meto_Id = @meto_Id,
				fact_UserModificacion = @fact_UserModifica

				WHERE fact_Id =	@fact_Id

			SELECT 200 AS codeStatus, 'Factura Modificada con éxito' AS messageStatus


	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

--************************************************************/Tabla Facturas******************************************************************--

-------------------------------------------------------------------------------------------------------------------------------------------------

--********************************************************Tabla Facturas Detalles***************************************************************--
CREATE OR ALTER PROC fact.UDP_tbFacturaDetalles_INDEX
AS BEGIN

SELECT * FROM fact.VW_FacturaDetalles
WHERE fade_Estado = 1;

END
GO

CREATE OR ALTER PROC fact.UDP_tbFacturaDetalles_FIND
@fade_Id INT
AS BEGIN

SELECT * FROM fact.VW_FacturaDetalles
WHERE fade_Id = @fade_Id

END
GO


CREATE OR ALTER PROC fact.UDP_tbFacturaDetalles_INSERT
@fact_Id INT,
@pren_Id INT,
@fade_Cantidad INT,
@fade_Total DECIMAL(8,2),
@fade_UserCrea INT
AS BEGIN

  	BEGIN TRY

			INSERT INTO  fact.tbFacturaDetalles
			(fact_Id, pren_Id, fade_Cantidad, fade_Total, fade_UserCrea)
			VALUES
			(@fact_Id, @pren_Id, @fade_Cantidad, @fade_Total, @fade_UserCrea)

			SELECT 200 AS codeStatus, 'Sucursal creado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH
END
GO

CREATE OR ALTER PROC fact.UDP_tbFacturaDetalles_UPDATE
@fade_Id INT,
@fact_Id INT,
@pren_Id INT,
@fade_Cantidad INT,
@fade_Total DECIMAL(8,2),
@fade_UserModifica INT
AS BEGIN

   	BEGIN TRY

			UPDATE fact.tbFacturaDetalles
			SET
				fact_Id = @fact_Id,
				pren_Id = @pren_Id,
				fade_Cantidad = @fade_Cantidad,
				fade_Total = @fade_Total,
				fade_UserModificacion = @fade_UserModifica

				WHERE fade_Id =	@fade_Id

			SELECT 200 AS codeStatus, 'Factura Detalle modificado con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH

END
GO

CREATE OR ALTER PROC fact.UDP_tbFacturaDetalles_DELETE
@fade_Id INT
AS BEGIN

    	BEGIN TRY
			UPDATE fact.tbFacturaDetalles
			SET
				fade_Estado		=	0
				WHERE fade_Id	=	@fade_Id

			SELECT 200 AS codeStatus, 'Factura Detalles Eliminada con éxito' AS messageStatus

	END TRY
	BEGIN CATCH
			SELECT 500 AS codeStatus, ERROR_MESSAGE ( ) AS messageStatus
	END CATCH


END


--*******************************************************/Tabla Facturas Detalles***************************************************************--

GO
 	DECLARE @user_NombreUsuario			NVARCHAR(200) = 'IsHatake'
	DECLARE @empl_Id					INT = 2
	DECLARE @user_Contraseña			NVARCHAR(MAX)='123'
	DECLARE @user_Admin					BIT = 0
	DECLARE @role_Id					INT	= 1
	DECLARE @user_UserCrea				INT = 1

	EXEC  acce.UDP_tbUsuarios_INSERT @user_NombreUsuario,@empl_Id,@user_Contraseña,@user_Admin,@role_Id,@user_UserCrea