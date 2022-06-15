import React from 'react'
import { Formik, Form, Field,  } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    //Creandp Esquema de Yup
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3,'El Nombre es muy corto')
                    .max(20,'El Nombre es muy Largo')
                    .required('El nombre del cliente es obligatorio'),

        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),

        email: Yup.string()
                    .email('Email no válido')
                    .required('El email es obligatorio'),
                    
        telefono: Yup.number().typeError('No es un número')
                    .positive('Numero no válido')
                    .integer('Numero no válido'),
    })

    //Funcion Cuando se envia el formulario
    const handleSubmit = async (valores)=> {
        try {

            let respuesta
            if (cliente?.id) {
                //Editando resgistro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
            }else{
                //Agregando un nuevo resgistr
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            const resultado = await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    
    cargando ? <Spinner/> : (
        //Añadiendo formik al proyecto
        <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className=' text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
            
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize =  {true}
                onSubmit={ async (values, {resetForm}) =>{
                    await handleSubmit(values)

                    resetForm()
                    //Redireccionando
                    navigate('/clientes')
                }}

                validationSchema = {nuevoClienteSchema}
            >
                {({errors, touched}) =>{
                    
                    return (  
                            
                <Form className=' mt-10'>
                    <div className=' mb-4'>
                        <label
                            className=' text-gray-800 '
                            htmlFor='nombre'
                        >Nombre:</label>
                        <Field
                            id='nombre'
                            name='nombre'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50 rounded-lg border'
                            placeholder='Nombre del Cliente'
                        />
                        {errors.nombre && touched.nombre ?(
                            <Alerta>{errors.nombre}</Alerta>
                        ): null }
                        
                    </div>
                    
                    <div className=' mb-4'>
                        <label
                            className=' text-gray-800'
                            htmlFor='empresa'
                        >Empresa:</label>
                        <Field
                            id='empresa'
                            name='empresa'
                            type='text'
                            className=' mt-2 block w-full p-3 bg-gray-50 rounded-lg border'
                            placeholder='Empresa del Cliente'
                        />
                        {errors.empresa && touched.empresa ?(
                            <Alerta>{errors.empresa}</Alerta>
                        ): null }
                    </div>

                    <div className=' mb-4'>
                        <label
                            className=' text-gray-800'
                            htmlFor='email'
                        >E-mail:</label>
                        <Field
                            id='empresa'
                            name='email'
                            type='email'
                            className=' mt-2 block w-full p-3 bg-gray-50 rounded-lg border'
                            placeholder='correo@ejemplo.com'
                        />
                        {errors.email && touched.email ?(
                            <Alerta>{errors.email}</Alerta>
                        ): null }
                    </div>

                    <div className=' mb-4'>
                        <label
                            className=' text-gray-800'
                            htmlFor='telefono'
                        >Teléfono:</label>
                        <Field
                            id='telefono'
                            name='telefono'
                            type='tel'
                            className=' mt-2 block w-full p-3 bg-gray-50 rounded-lg border'
                            placeholder='Teléfono del Cliente'
                        />
                        {errors.telefono && touched.telefono ?(
                            <Alerta>{errors.telefono}</Alerta>
                        ): null }
                    </div>

                    <div className=' mb-4'>
                        <label
                            className=' text-gray-800'
                            htmlFor='notas'
                        >Notas:</label>
                        <Field
                            as='textarea'
                            id='notas'
                            name='notas'
                            type='text'
                            className=' mt-2 block w-full p-3 bg-gray-50 rounded-lg border h-40'
                            placeholder='Notas del Cliente'
                        />
                    </div>

                    <input 
                        type="submit" 
                        value={cliente?.nombre ? 'Actualizar Cliente' : 'Agregar Cliente'}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-lg hover:cursor-pointer hover:bg-blue-600 transition' 
                    />
                </Form>
                )}}

            </Formik>
        </div>
    )
  )
}

Formulario.defoultProps = {
    cliente: {},
    cargando: false
}

export default Formulario