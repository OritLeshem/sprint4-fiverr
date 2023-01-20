import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { addGig } from '../../store/gig/gig.actions'

import { gigService } from '../../services/gig.service'

export function GigEdit() {

    const { gigId } = useParams()
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    console.log(gigToEdit);

    useEffect(() => {
        if (!gigId) return
        loadGig()
    }, [])

    const loadGig = async () => {
        const gig = await gigService.getById(gigId)
        setGigToEdit(gig)
    }

    const GigSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: Yup.number().min(1, 'Too Short!').required('Required'),
        tags: Yup.string()
            // .min(1, 'Please select an option')
            .required('Required')

    })

    //   const goBack = () => {
    //     navigate('/gig')
    //   }

    const onSave = async (values) => {
        console.log(values);
        try {
            values.tags = [values.tags]
            values.tags1 = [values.tags]
            console.log(values);
            //   await addGig(values, goBack)
        } catch (err) {
            console.log('Cannot save gig: ', err)
        }
    }

    return (
        <Formik
            initialValues={gigToEdit}
            validationSchema={GigSchema}
            onSubmit={onSave}
            enableReinitialize
        >
            {({ errors, touched, values }) => {
                return (
                    <Form className='gig-edit-form'>

                        <div className="gig-form-title">
                            <label htmlFor="title">Gig title</label>
                            <Field type="text" id="title" name="title" />
                            {errors.title && touched.title ? <div>{errors.title}</div> : null}
                        </div>

                        <div className="gig-form-price">
                            <label htmlFor="price">Price</label>
                            <Field name="price" id="price" label="price" />
                            {errors.price && touched.price ? <div>{errors.price}</div> : null}
                        </div>
                        
                        <label htmlFor="tags">Category</label>
                        <Field as={Select} name='tags'>
                            <MenuItem value=''>Select A Categry</MenuItem>
                            <MenuItem value='graphic-design'>Graphic-design</MenuItem>
                            <MenuItem value='music-audio'>music-audio</MenuItem>
                            <MenuItem value='lifestyle'>Lifestyle</MenuItem>
                        </Field>
                        {errors.tags && touched.tags ? <div>Please select an option</div> : null}

                        <label htmlFor="daysToMake">Days to make</label>
                        <Field as={Select} name='daysToMake'>
                            <MenuItem value='1'>Express</MenuItem>
                            <MenuItem value='3'>Up to 3 days</MenuItem>
                            <MenuItem value='7'>Up to 7 days</MenuItem>
                        </Field>
                        {errors.daysToMake && touched.daysToMake ? <div>Please select an option</div> : null}
                        <Button variant='contained' type='submit'>
                            Submit
                        </Button>
                    </Form>
                )
            }}
        </Formik >
    )
}