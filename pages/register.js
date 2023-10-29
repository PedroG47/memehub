import Head from 'next/head'
import { theme } from '../src/theme/theme';
import { Image, Box, Text, Input, Button, Label, InputGroup, Paragraph } from '../src/theme/components';
import Page from '../src/components/Page';
import Link from '../src/components/Link';

const AUTH_LOGO = '/images/logo.svg';

export default function RegisterPage(){
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

                        <form>
                            <InputGroup>
                                <Label>Seu nome completo</Label>
                                <Input 
                                    placeholder="Usuário 2" 
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Sua data de nascimento</Label>
                                <Input 
                                    type="date"
                                    placeholder="05/05/2000" 
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Seu nome de usuário</Label>
                                <Input 
                                    icon={'/images/alternate_email.svg'}
                                    placeholder="usuariodois" 
                                />
                            </InputGroup>

                            <InputGroup styleSheet={{
                            }}>
                                <Label>Digite a senha desejada</Label>
                                <Input 
                                    icon={'/images/lock.svg'}
                                    type="password" 
                                    placeholder="********" 
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
                                />
                            </InputGroup>
                            
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