--************************************************************* VISTAS ******************************************************************--USE db_VERA

CREATE OR ALTER VIEW acce.VW_Usuarios
AS
SELECT	user_Id,
		user_NombreUsuario,
		T1.empl_Id,
		nombreEmpleado = CONVERT(VARCHAR,T2.empl_Nombres+' '+T2.empl_ApellIdos),
		user_Admin,
		user_Contraseña,
		CASE WHEN user_Admin  = 1 THEN 'SI'
		ELSE 'NO' END AS EsAdmin,
		T1.role_Id,
		CASE WHEN  role_Descripcion is null THEN 'N/A' 
		ELSE role_Descripcion END AS role_Descripcion,
		T1.user_Estado,
		T1.user_UserCrea,
		T4.sucu_Id,
		sucu_Nombre,
		(SELECT empl_Nombres+' '+empl_ApellIdos FROM vera.tbEmpleados
		WHERE empl_Id IN (SELECT empl_Id FROM acce.tbUsuarios WHERE [user_Id] = [user_UserCrea])) AS empl_Crea,
		[user_FechaCrea],
		T1.user_UserModifica,
		(SELECT empl_Nombres+' '+empl_ApellIdos FROM vera.tbEmpleados 
		WHERE empl_Id IN (SELECT empl_Id FROM acce.tbUsuarios WHERE [user_Id] = [user_UserModifica])) AS empl_Modifica,
		[user_FechaModifica]
		FROM acce.tbUsuarios T1
		INNER JOIN vera.tbEmpleados T2
		ON T1.empl_Id = T2.empl_Id
		INNER JOIN vera.tbSucursales T4
		ON T4.sucu_Id = T2.sucu_Id
		LEFT JOIN acce.tbRoles T3
		ON T1.role_Id = T3.role_Id
	

GO

CREATE OR ALTER VIEW acce.VW_Pantallas
AS
SELECT	pant_Id, 
		pant_Nombre, 
		pant_Identificador, 
		pant_href, 
		pant_Estado, 
		pant_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = pant_UserCrea),
		pant_FechaCrea, 
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = pant_UserModifica), 
		pant_UserModifica,
		pant_FechaModifica
		FROM acce.tbPantallas

GO

CREATE OR ALTER VIEW acce.VW_Roles
AS
SELECT	role_Id, 
		role_Descripcion, 
		role_Estado, 
		role_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = role_UserCrea), 
		role_FechaCrea, 
		role_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = role_UserModifica), 
		role_FechaModifica
		FROM acce.tbRoles

GO

CREATE OR ALTER VIEW mant.VW_Departamentos
AS
SELECT	dept_Id, 
		dept_Descripcion, 
		dept_Estado, 
		dept_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = dept_UserCrea),
		dept_FechaCrea,
		dept_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = dept_UserModifica), 
		dept_FechaModifica
		FROM [mant].[tbDepartamentos]

GO

CREATE OR ALTER VIEW mant.VW_Municipios
AS
SELECT	muni_Id, 
		T1.dept_Id,
		T2.dept_Descripcion, 
		muni_Descripcion,
		muni_Estado, 
		muni_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = muni_UserCrea), 
		muni_FechaCrea, 
		muni_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = muni_UserModifica),  
		muni_FechaModifica
		FROM [mant].[tbMunicipios] T1
		INNER JOIN mant.tbDepartamentos T2
		ON T1.dept_Id = T2.dept_Id

GO

CREATE OR ALTER VIEW mant.VW_EstadosCiviles
AS
SELECT	estc_Id, 
		estc_Descripcion, 
		estc_Estado, 
		estc_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = estc_UserCrea),  
		estc_FechaCrea, 
		estc_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = estc_UserModifica),   
		estc_FechaModifica
		FROM mant.tbEstadosCiviles

GO

CREATE OR ALTER VIEW mant.VW_Cargos
AS
SELECT	carg_Id, 
		carg_Descripcion, 
		carg_Estado,
		carg_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = carg_UserCrea),   
		carg_FechaCrea, 
		carg_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = carg_UserModifica),    
		carg_FechaModificacion
		FROM mant.tbCargos

GO

CREATE OR ALTER VIEW vera.VW_Sucursales
AS
SELECT	sucu_Id, 
		sucu_Nombre, 
		muni_Descripcion,
		T1.muni_Id, 
		T3.dept_Id,
		T3.dept_Descripcion,
		sucu_Direccion, 
		sucu_Estado, 
		sucu_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = sucu_UserCrea),    
		sucu_FechaCreacion, 
		sucu_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = sucu_UserModifica),     
		sucu_FechaModificacion
		FROM vera.tbSucursales T1
		INNER JOIN mant.tbMunicipios T2
		 ON T1.muni_Id = T2.muni_Id
		 INNER JOIN mant.tbDepartamentos T3
		 ON T2.dept_Id = T3.dept_Id

GO

CREATE OR ALTER VIEW vera.VW_Categorias
AS
SELECT	cate_Id, 
		cate_Descripcion, 
		cate_Estado,
		cate_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = cate_UserCrea),     
		cate_FechaCrea, 
		cate_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = cate_UserModifica),      
		cate_FechaModificacion
		FROM vera.tbCategorias

GO

CREATE OR ALTER VIEW vera.VW_Marcas
AS
SELECT	marc_Id, 
		marc_Descripcion, 
		marc_Estado,
		marc_UserCrea, 
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = marc_UserCrea),     
		marc_FechaCrea, 
		marc_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = marc_UserModifica),       
		marc_FechaModificacion
		FROM vera.tbMarcas

GO


CREATE OR ALTER VIEW vera.VW_Empleados
AS
SELECT	empl_Id, 
		empl_Nombres, 
		empl_Apellidos,
		empl_Identidad,
		NombreCliente = CAST(empl_Nombres+' '+empl_Apellidos AS VARCHAR (150)),
		T1.carg_Id,
		T5.carg_Descripcion, 
		empl_FechaNacimiento,
		empl_Sexo,
		CASE WHEN empl_Sexo = 'M' THEN 'Masculino'
		ELSE 'Femenino' END AS emplSexo, 
		T1.estc_Id,
		T4.estc_Descripcion,
		empl_Telefeno,
		T2.dept_Id,
		T3.dept_Descripcion,
		T1.muni_Id,
		T2.muni_Descripcion,
		T1.sucu_Id,
		T6.sucu_Nombre,
		empl_Direccion, 
		empl_Estado,
		empl_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = empl_UserCrea),      
		empl_FechaCreacion, 
		empl_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = empl_UserModifica),        
		empl_FechaModificacion
FROM vera.tbEmpleados			 T1
INNER JOIN mant.tbMunicipios	 T2
ON T1.muni_Id = T2.muni_Id
INNER JOIN mant.tbDepartamentos  T3
ON T2.dept_Id = T3.dept_Id
INNER JOIN mant.tbEstadosCiviles T4
ON T1.estc_Id = T4.estc_Id
INNER JOIN mant.tbCargos T5
ON T1.carg_Id = T5.carg_Id
INNER JOIN vera.tbSucursales T6
ON T1.sucu_Id = T6.sucu_Id

GO

CREATE OR ALTER VIEW vera.VW_Clientes
AS
SELECT	clie_Id, 
		clie_Nombres, 
		clie_ApellIdos,
		NombreCliente = CAST(clie_Nombres+' '+clie_ApellIdos AS VARCHAR (150)), 
		clie_FechaNacimiento,
		clie_Sexo,
		clie_Identidad,
		CASE WHEN clie_Sexo = 'M' THEN 'Masculino'
		ELSE 'Femenino' END AS clieSexo, 
		T1.estc_Id,
		T4.estc_Descripcion,
		clie_Telefeno,
		T2.dept_Id,
		T3.dept_Descripcion,
		T1.muni_Id,
		T2.muni_Descripcion,
		clie_Direccion, 
		clie_Estado,
		clie_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = clie_UserCrea),      
		clie_FechaCreacion, 
		clie_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = clie_UserModifica),        
		clie_FechaModificacion
FROM vera.tbClientes			 T1
INNER JOIN mant.tbMunicipios	 T2
ON T1.muni_Id = T2.muni_Id
INNER JOIN mant.tbDepartamentos  T3
ON T2.dept_Id = T3.dept_Id
INNER JOIN mant.tbEstadosCiviles T4
ON T1.estc_Id = T4.estc_Id
WHERE clie_Estado = 1;

GO

CREATE OR ALTER VIEW vera.VW_Descuentos
AS
SELECT	desc_Id, 
		desc_Color, 
		desc_Estado,
		desc_ColorHexa,
		desc_Descuento, 
		desc_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = desc_UserCrea),       
		desc_FechaCreacion, 
		desc_UserModificacion,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = desc_UserModificacion),         
		desc_FechaModificacion
		FROM vera.tbDescuentos

GO

CREATE OR ALTER VIEW vera.VW_Proveedores
AS
SELECT	prov_Id, 
		prov_Nombres, 
		prov_ApellIdos, 
		prov_Telefeno,
		T3.dept_Id,
		T3.dept_Descripcion,
		T1.muni_Id,
		T2.muni_Descripcion, 
		prov_Direccion, 
		prov_Estado, 
		prov_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = prov_UserCrea),
		prov_FechaCreacion, 
		prov_UserModifica,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = prov_UserModifica),
		prov_FechaModificacion
		FROM vera.tbProveedores			T1
		INNER JOIN mant.tbMunicipios	T2
		ON T1.muni_Id = T2.muni_Id
		INNER JOIN mant.tbDepartamentos T3
		ON T2.dept_Id =  T3.dept_Id 

GO

CREATE OR ALTER VIEW vera.VW_Fardos
AS
SELECT	fard_Id,
		fard_Descripcion,
		fard_Estado,
		fard_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = fard_UserCrea),
		fard_FechaCreacion,
		fard_UserModificacion,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = fard_FechaCreacion),         
		fard_FechaModificacion
		FROM vera.tbFardos

GO

CREATE OR ALTER VIEW vera.VW_Prendas
AS
SELECT	pren_Id, 
		pren_Descripcion, 
		pren_Talla, 
		T1.desc_Id, 
		T4.desc_Color,
		T4.desc_ColorHexa,
		T4.desc_Descuento,
		pren_Precio, 
		T1.marc_Id, 
		T2.marc_Descripcion,
		T1.cate_Id,
		T3.cate_Descripcion,
		T1.fard_Id, 
		T5.fard_Descripcion,
		pren_Imagen, 
		prend_EstadoTienda, 
		CASE prend_EstadoTienda WHEN 1 THEN 'Disponible'
		ELSE 'Vendida' END as Disponibilidad,
		pren_Estado,
		pren_UserCrea, 
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = pren_UserCrea),
		pren_FechaCreacion, 
		pren_UserModificacion, 
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = pren_UserModificacion),         
		pren_FechaModificacion
		FROM vera.tbPrendas			 T1
		INNER JOIN vera.tbMarcas	 T2
		ON T1.marc_Id = T2.marc_Id
		INNER JOIN vera.tbCategorias T3
		ON T1.cate_Id = T3.cate_Id
		INNER JOIN vera.tbDescuentos T4
		ON T1.desc_Id = T4.desc_Id
		INNER JOIN vera.tbFardos  T5
		ON T1.fard_Id = T5.fard_Id

GO

CREATE OR ALTER VIEW fact.VW_MetodosPagos
AS
SELECT	meto_Id, 
		meto_Descripcion, 
		meto_Estado,
		meto_UserCrea, 
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = meto_UserCrea),
		meto_FechaCreacion, 
		meto_UserModificacion, 
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = meto_UserModificacion),         
		meto_FechaModificacion
		FROM fact.tbMetodosPagos

GO

CREATE OR ALTER VIEW fact.VW_Facturas
AS
SELECT	fact_Id, 
		T1.clie_Id,
		T2.clie_Nombres,
		clie_Nombres + ' ' + clie_Apellidos AS clie_Nombre,
		T2.clie_ApellIdos,
		T1.empl_Id,
		empl_Nombres + ' ' + empl_Apellidos AS empl_Nombre,
		T3.empl_Nombres,
		T3.empl_ApellIdos,
		fact_Fecha, 
		T1.sucu_Id,
		T4.sucu_Nombre,
		T1.meto_Id,
		T5.meto_Descripcion,
		fact_UserCrea,
		empl_crea = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = fact_UserCrea),
		fact_FechaCreacion, 
		fact_UserModificacion,
		empl_Modifica = (SELECT nombreEmpleado FROM acce.VW_Usuarios WHERE [user_Id] = fact_UserModificacion),         
		fact_FechaModificacion
		FROM fact.tbFacturas		   T1
		INNER JOIN vera.tbClientes	   T2
		ON T1.clie_Id = T2.clie_Id
		INNER JOIN vera.tbEmpleados	   T3
		ON T1.empl_Id = T3.empl_Id
		INNER JOIN vera.tbSucursales   T4
		ON T1.sucu_Id = T4.sucu_Id
		INNER JOIN fact.tbMetodosPagos T5
		ON T1.meto_Id = T5.meto_Id

GO

CREATE OR ALTER VIEW fact.VW_FacturaDetalles
AS
SELECT	fade_Id,
		fact_Id, 
		T1.pren_Id,
		T2.pren_Descripcion,
		T2.pren_Precio,
		T2.pren_Talla,
		T2.pren_Imagen,
		fade_Cantidad, 
		fade_Total, 
		fade_UserCrea, 
		fade_FechaCreacion, 
		fade_UserModificacion, 
		fade_FechaModificacion, 
		fade_Estado
		FROM fact.tbFacturaDetalles T1
		INNER JOIN vera.tbPrendas	T2
		ON T1.pren_Id = T2.pren_Id

GO

CREATE OR ALTER VIEW vera.VW_FardosProveedores
AS 
SELECT  fapr_Id, 
		T1.fard_Id, 
		fard_Descripcion,
		T1.prov_Id,
		prov_Nombres + prov_Apellidos AS prov_Nombre,
		fapr_UserCrea, 
		fapr_FechaCreacion, 
		fapr_UserModificacion, 
		fapr_FechaModificacion, 
		fapr_Estado, 
		fapr_Cantidad 
		FROM vera.tbFardosProveedor T1
		INNER JOIN vera.tbFardos T2
		ON T1.fard_Id = T2.fard_Id
		INNER JOIN vera.tbProveedores T3
		ON T1.prov_Id = T3.prov_Id
GO

CREATE OR ALTER VIEW vera.VW_Reporte
AS
	SELECT
			Fecha = CONVERT(NVARCHAR, FORMAT(fade_FechaCreacion, 'D', 'es-HN')),
			Total_Ventas_Al_Dia = CONVERT(NVARCHAR, COUNT(fade_FechaCreacion)),
			Total_Dia = CONVERT(NVARCHAR, SUM(fade_Cantidad * fade_Total)) +' '+ 'L.'	
			FROM fact.tbFacturaDetalles
			GROUP BY CONVERT(NVARCHAR, FORMAT(fade_FechaCreacion, 'D', 'es-HN'));

GO


--SELECT * FROM acce.VW_Usuarios
--SELECT * FROM acce.VW_Pantallas
--SELECT * FROM acce.VW_Roles

--SELECT * FROM mant.VW_Departamentos
--SELECT * FROM mant.VW_Municipios
--SELECT * FROM mant.VW_EstadosCiviles
--SELECT * FROM mant.VW_Cargos

--SELECT * FROM vera.VW_Sucursales
--SELECT * FROM vera.VW_Categorias
--SELECT * FROM vera.VW_Marcas
--SELECT * FROM vera.VW_Empleados
--SELECT * FROM vera.VW_Clientes
--SELECT * FROM vera.VW_Descuentos
--SELECT * FROM vera.VW_Proveedores
--SELECT * FROM vera.VW_Fardos
--SELECT * FROM vera.VW_Prendas

--SELECT * FROM fact.VW_MetodosPagos
--SELECT * FROM fact.VW_Facturas
--SELECT * FROM fact.VW_FacturaDetalles