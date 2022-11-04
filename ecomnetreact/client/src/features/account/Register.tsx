import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useHistory } from 'react-router-dom';
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const history = useHistory();
  const [validationErrors, setValidationErrors] = useState([])
  const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: 'all'
  })

  function handleApiErrors(errors: any){
    if(errors){
      errors.forEach((error: string) => {
        if (error.includes('Password')){
          setError('password', {message: error})
        } else if ( error.includes('Email')) {
          setError('email', {message: error})
        } else if ( error.includes('Username')) {
          setError('username', {message: error})
        }
      })
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm" 
      sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 4
    }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" 
        onSubmit={handleSubmit((data) => 
          agent.Account.register(data)
          .then(()=>{
            toast.success('Registration successful - you can now login');
            history.push('/login');
          })
          .catch(error => handleApiErrors(error)))} 
        noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Username"
          autoFocus
          {...register('username', {required: 'Username is required'})}
          error={!!errors.email}
          helperText={errors?.username?.message?.toString()}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              // Regex needs to be between the ticks. ( /<Your regex goes here>/ )
              value: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              message: 'Not a valid email address'
            }
          })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
        />
        <TextField
          required
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password does not meet complexity requirements'
            }
          })}
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />
        {validationErrors.length > 0 &&
          <Alert severity='error'>
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map(error => (
                <ListItem key={error}>
                  <ListItemText>
                    {error}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        }
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}