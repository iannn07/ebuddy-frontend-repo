'use client'

import { loginAction } from '@/app/auth/login/utils/loginAction'
import { loginFailure, loginStart, resetError } from '@/store/slices/authSlices'
import { AppDispatch, RootState } from '@/store/store'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { InferInput, nonEmpty, object, pipe, string } from 'valibot'

const loginSchema = object({
  email: pipe(string(), nonEmpty('Email is required')),
  password: pipe(string(), nonEmpty('Password is required')),
})

type loginFields = InferInput<typeof loginSchema>

function LoginComponents() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useSelector((state: RootState) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFields>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const fields = [
    {
      label: 'Email Address',
      name: 'email',
      autoComplete: 'email',
      autoFocus: true,
      type: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      autoComplete: 'current-password',
      type: 'password',
    },
  ]

  /**
   * * Login form submission
   * @param data
   */
  const onSubmit = async (data: loginFields) => {
    try {
      dispatch(loginStart())

      const { success, error } = await loginAction(data.email, data.password)

      if (!success) {
        if (error === 'User not found') {
          dispatch(loginFailure(error))
          return
        }

        if (error === 'Token not found') {
          dispatch(loginFailure('Token not found'))
          return
        }

        if (error === 'Token validation failed') {
          dispatch(loginFailure('Token Validation Failed'))
          return
        }
      }

      router.replace('/home')
    } catch (error) {
      dispatch(
        loginFailure(
          error instanceof Error ? error.message : 'An error occurred'
        )
      )
    }
  }

  return (
    <Container className='flex items-center justify-center min-h-screen'>
      <Card className='p-5 w-full max-w-2xl'>
        <CardContent className='flex flex-col gap-5 w-full'>
          <Box className='flex flex-col items-center gap-2'>
            <Typography component='h1' variant='h4'>
              Login
            </Typography>
            <Typography component='p' variant='body1'>
              Sign in to your account
            </Typography>
          </Box>
          {error && (
            <Alert
              severity='error'
              variant='filled'
              className='w-full'
              onClose={() => dispatch(resetError())}
            >
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <FormControl className='w-full min-w-2xl'>
              {fields.map((field, index) => (
                <Controller
                  key={index}
                  name={field.name as 'email' | 'password'}
                  control={control}
                  render={({ field: controllerField }) => (
                    <>
                      <Typography component='label' variant='body2'>
                        {field.label}
                      </Typography>
                      <TextField
                        {...controllerField}
                        id={field.name}
                        name={field.name}
                        autoComplete={field.autoComplete}
                        autoFocus={field.autoFocus ? true : false}
                        placeholder={`Enter your ${field.label}`}
                        type={showPassword ? 'text' : field.type}
                        fullWidth
                        className='mb-5 mt-2 min-w-2xl'
                        error={!!errors[field.name as keyof loginFields]}
                        helperText={
                          errors[field.name as keyof loginFields]?.message
                        }
                        sx={{
                          '& .MuiFormHelperText-root': {
                            marginLeft: 0,
                            marginRight: 0,
                          },
                        }}
                        slotProps={
                          field.type === 'password'
                            ? {
                                input: {
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <IconButton
                                        onClick={handleClickShowPassword}
                                        edge='end'
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                },
                              }
                            : undefined
                        }
                      />
                    </>
                  )}
                />
              ))}
            </FormControl>
            <Box className='w-full flex justify-center items-center'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                fullWidth
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginComponents
