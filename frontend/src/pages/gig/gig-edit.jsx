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
import { ImgUploader } from '../../cmps/img-uploader'

export function GigEdit() {
    const navigate = useNavigate()
    const { gigId } = useParams()
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    const gigForFormik = { ...gigToEdit, tags2: '' }

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
        description: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: Yup.number().min(1, 'minimum 1$').required('Required'),
        tags: Yup.string()
            // .min(1, 'Please select an option')
            .required('Required'),
        tags2: Yup.string()
            // .min(1, 'Please select an option')
            .required('Required')

    })

    const goBack = () => {
        navigate('/user/userId')
    }

    function onUploaded(data) {
        setGigToEdit((prevgig) => ({ ...prevgig, imgUrl: [...prevgig.imgUrl, data] }))

    }

    const onSave = async (values) => {
        try {
            gigToEdit.tags.push(values.tags)
            gigToEdit.tags.push(values.tags2)
            gigToEdit.title = values.title
            gigToEdit.description = values.description
            gigToEdit.price = values.price
            gigToEdit.daysToMake = values.daysToMake
            console.log(gigToEdit);
            await addGig(gigToEdit, goBack)
        } catch (err) {
            console.log('Cannot save gig: ', err)
        }
    }

    return (
        <Formik
            initialValues={gigForFormik}
            validationSchema={GigSchema}
            onSubmit={onSave}
            enableReinitialize
        >
            {({ errors, touched, values }) => {
                return (
                    <Form className='gig-edit-form'>
                        <div className='gig-edit-form-wrapper'>
                            <div className="gig-form-title">
                                <label htmlFor="title">Gig title</label>
                                <Field type="text" id="title" name="title" placeholder="I will..." />
                                {errors.title && touched.title ? <div>{errors.title}</div> : null}
                            </div>

                            <div className="gig-form-description">
                                <label htmlFor="description">Gig description</label>
                                <Field type="text" id="description" name="description" />
                                {errors.description && touched.description ? <div>{errors.description}</div> : null}
                            </div>

                            <div className="gig-form-category">
                                <label htmlFor="tags">Category</label>
                                <div className="gig-form-category1">
                                    <Field as={Select} name='tags'>
                                        <MenuItem value=''>Select A Categry</MenuItem>
                                        <MenuItem value='graphic-design'>Graphic & design</MenuItem>
                                        <MenuItem value='digital-marketing'>Digital Marketing</MenuItem>
                                        <MenuItem value='writing-translation'>Writing & Translation</MenuItem>
                                        <MenuItem value='video-animation'>Video & Animation</MenuItem>
                                        <MenuItem value='music-audio'>Music & Audio</MenuItem>
                                        <MenuItem value='programming-Tech'>Programming & Tech</MenuItem>
                                        <MenuItem value='business'>Business</MenuItem>
                                        <MenuItem value='lifestyle'>Lifestyle</MenuItem>
                                        <MenuItem value='data'>Data</MenuItem>
                                        <MenuItem value='data'>Photography</MenuItem>
                                    </Field>
                                    {errors.tags && touched.tags ? <div>Please select an option</div> : null}
                                </div>

                                <div className="gig-form-category2">
                                    <Field as={Select} name='tags2'>
                                        <MenuItem value=''>Select A Categry</MenuItem>
                                        <MenuItem value='graphic-design'>Graphic&design</MenuItem>
                                        <MenuItem value='music-audio'>music&audio</MenuItem>
                                        <MenuItem value='lifestyle'>Lifestyle</MenuItem>
                                    </Field>
                                    {errors.tags2 && touched.tags2 ? <div>Please select an option</div> : null}
                                </div>
                            </div >

                            <div className="gig-form-inputs">
                                <div className="gig-form-price">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" id="price" label="price" />
                                    {errors.price && touched.price ? <div>{errors.price}</div> : null}
                                </div>

                                <div className="gig-form-days">
                                    <label htmlFor="daysToMake">Days to make</label>
                                    <Field as={Select} name='daysToMake'>
                                        <MenuItem value='1'>Express</MenuItem>
                                        <MenuItem value='3'>Up to 3 days</MenuItem>
                                        <MenuItem value='7'>Up to 7 days</MenuItem>
                                    </Field>
                                    {errors.daysToMake && touched.daysToMake ? <div>Please select an option</div> : null}
                                </div>
                            </div>
                            <ImgUploader onUploaded={onUploaded} />
                            {gigToEdit.imgUrl && <ul className="upload-img-list">{gigToEdit.imgUrl.map((img, index) => <li key={index} className="upload-img-gig"><img src={img} /></li>)}</ul>}
                        </div >
                        <div className="gig-edit-btn-wrapper">
                            <Button variant='contained' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </Form >
                )
            }}
        </Formik >
    )
}