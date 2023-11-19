import Head from 'next/head'
import { theme } from '../src/theme/theme';
import { Image, Box, Text, Input, Button, Label, InputGroup, Paragraph } from '../src/theme/components';
import Page from '../src/components/Page';
import Link from '../src/components/Link';
import { useEffect, useState } from 'react';
import request from '../src/utils/request';

const AUTH_LOGO = '/images/logo.svg';

export default function RegisterPage(){
    const [checkUser, setCheckUser] = useState(false)
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState({
        user: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    })

    const validateFormInput = () => {
        let inputError = {
          user: "",
          email: "",
          birthday: "",
          password: "",
          confirmPassword: "",
        };
      
        // Check if user, email, and password are empty
        if (!user && !email && !password && !birthday) {
          setFormError({
            ...inputError,
            user: "User should not be empty",
            email: "Enter a valid email address",
            birthday: "Birthday should not be empty",
            password: "Password should not be empty",
          });
          return false;
        }
      
        if (!user) {
          setFormError({
            ...inputError,
            user: "User should not be empty",
          });
          return false;
        }
      
        // Check email is empty
        if (!email) {
          setFormError({
            ...inputError,
            email: "Enter a valid email address",
          });
          return false;
        }

        if (!birthday) {
            setFormError({
              ...inputError,
              birthday: "Birthday should not be empty",
            });
            return false;
        }
      
        // Check if password and confirm password match
        if (confirmPassword !== password) {
          setFormError({
            ...inputError,
            confirmPassword: "Password and confirm password should be the same",
          });
          return false;
        }
      
        // Check if password is empty
        if (!password) {
          setFormError({
            ...inputError,
            password: "Password should not be empty",
          });
          return false;
        }
      
        // Check if password has more than 6 characters
        if (password.length < 8) {
          setFormError({
            ...inputError,
            password: "Password should have at least 8 characters",
          });
          return false;
        }
      
        setFormError(inputError);
      
        return true;
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        const isFormValid = validateFormInput();
        
        if (isFormValid) {
            setCheckUser(true)
            const register = await request(`/api/user`, 'post', {
                username: user,
                email: email,
                password: password,
                birthday: birthday,
            }).then(
                window.location.href = '/login'
              )
        }
    }
    
    return(
        <>
            <Head>
                <title>Registrar - MemeHub</title>
            </Head>
            <Page styleSheet={{
                    justifyContent: 'space-around',
                    paddingLeft: theme.space['x2.5'],
                    paddingRight: theme.space['x2.5']
                }}>
                    <Box>
                        <Box styleSheet={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Image src={AUTH_LOGO} styleSheet={{
                                height: '68px',
                                marginBottom: theme.space.x8
                            }}/>
                        </Box>
                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.heading3.fontSize.xs,
                            fontWeight: 600,
                            color: theme.colors.neutral[900],
                            marginBottom: theme.space.x6,
                            textAlign: 'center'
                        }}>
                            Preencha os dados e registre-se
                        </Paragraph>

                        <form onSubmit={handleFormSubmit}>
                            <InputGroup>
                                <Label>Seu nome de usuário</Label>
                                <Input 
                                    icon={'/images/alternate_email.svg'}
                                    placeholder="usuariodois" 
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                                <Paragraph styleSheet={{
                                    marginBottom: 0,
                                    color: theme.colors.palette.error,
                                    fontSize: theme.typography.variants.body4.fontSize
                                }}>{formError.user}</Paragraph>
                            </InputGroup>
                            <InputGroup>
                                <Label>Sua data de nascimento</Label>
                                <Input 
                                    type="date"
                                    placeholder="05/05/2000" 
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                                <Paragraph styleSheet={{
                                    marginBottom: 0,
                                    color: theme.colors.palette.error,
                                    fontSize: theme.typography.variants.body4.fontSize
                                }}>{formError.birthday}</Paragraph>
                            </InputGroup>

                            <InputGroup>
                                <Label>Seu e-mail</Label>
                                <Input 
                                    placeholder="nome@email.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Paragraph styleSheet={{
                                    marginBottom: 0,
                                    color: theme.colors.palette.error,
                                    fontSize: theme.typography.variants.body4.fontSize
                                }}>{formError.email}</Paragraph>
                            </InputGroup>

                            <InputGroup styleSheet={{
                            }}>
                                <Label>Digite a senha desejada</Label>
                                <Input 
                                    icon={'/images/lock.svg'}
                                    type="password" 
                                    placeholder="********" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Paragraph styleSheet={{
                                    marginBottom: 0,
                                    color: theme.colors.palette.error,
                                    fontSize: theme.typography.variants.body4.fontSize
                                }}>{formError.password}</Paragraph>
                            </InputGroup>

                            <InputGroup styleSheet={{
                                marginBottom: theme.space.x9
                            }}>
                                <Label>Confirme sua senha</Label>
                                <Input 
                                    icon={'/images/lock.svg'}
                                    type="password" 
                                    placeholder="********" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Paragraph styleSheet={{
                                    marginBottom: 0,
                                    color: theme.colors.palette.error,
                                    fontSize: theme.typography.variants.body4.fontSize
                                }}>{formError.confirmPassword}</Paragraph>
                            </InputGroup>
                            
                            <Button>{!checkUser ? 'REGISTRAR' : 'REGISTRANDO...'}</Button>
                        </form>
                    </Box>
                    <Paragraph 
                        styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize, 
                            fontWeight: 300,
                            textAlign: 'center',
                            marginTop: theme.space.x12
                        }}>
                            Já possui uma conta? <Text 
                        styleSheet={{
                            color: theme.colors.palette.orange, 
                            fontWeight: 700
                        }}>
                            <Link href={'/'}>
                                Faça login
                            </Link>
                        </Text>
                    </Paragraph>
                </Page>
        </>
    )
}