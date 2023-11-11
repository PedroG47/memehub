import Head from 'next/head'
import { theme } from '../src/theme/theme';
import { Image, Box, Text, Input, Button, Label, InputGroup, Paragraph } from '../src/theme/components';
import Page from '../src/components/Page';
import Link from '../src/components/Link';
import { useEffect, useState } from 'react';

const AUTH_LOGO = '/images/logo.svg';

export default function RegisterPage(){

    const [user, setUser] = useState('');
    const [birthday, setBirthday] = useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = () => {
        if (password.length < 6) {
          setPasswordError('A senha deve conter no mínimo 6 caracteres');
          return false;
        }
        setPasswordError('');
        return true;
    };

    const equalPasswords = () => {
        if(password === confirmedPassword){
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const isPasswordValid = validatePassword();
        const equalPassword = equalPasswords()

        if(isPasswordValid && equalPassword){
            
        }

        console.log('user:' + user)
        console.log('birthday:' + birthday)
        console.log('email:' + email)
        console.log('password:' + password)
        console.log('confirmedPassword:' + confirmedPassword)
    
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
                                marginBottom: theme.space.x10
                            }}/>
                        </Box>
                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.heading3.fontSize.xs,
                            fontWeight: 600,
                            color: theme.colors.neutral[900],
                            marginBottom: theme.space.x8,
                            textAlign: 'center'
                        }}>
                            Preencha os dados e registre-se
                        </Paragraph>

                        <form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Label>Seu nome de usuário</Label>
                                <Input 
                                    icon={'/images/alternate_email.svg'}
                                    placeholder="usuariodois" 
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Sua data de nascimento</Label>
                                <Input 
                                    type="date"
                                    placeholder="05/05/2000" 
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Seu e-mail</Label>
                                <Input 
                                    placeholder="nome@email.com" 
                                    alue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                            </InputGroup>

                            <InputGroup styleSheet={{
                                marginBottom: theme.space.x9
                            }}>
                                <Label>Confirme sua senha</Label>
                                <Input 
                                    icon={'/images/lock.svg'}
                                    type="password" 
                                    placeholder="********" 
                                    value={confirmedPassword}
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                />
                            </InputGroup>

                            {!passwordsMatch && (
                                <div style={{ color: 'red' }}>As senhas não coincidem.</div>
                            )}
                            
                            <Button>REGISTRAR</Button>
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