import Head from 'next/head'
import { theme } from '../src/theme/theme';
import { Image, Box, Text, Input, Button, Label, InputGroup, Paragraph } from '../src/theme/components';
import Page from '../src/components/Page'
import Link from '../src/components/Link';

const AUTH_LOGO = '/images/logo.svg';


export default function HomePage(){
    return(
        <>
            <Head>
                <title>Login - MemeHub</title>
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
                                marginBottom: '98px'
                            }}/>
                        </Box>
                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.heading3.fontSize.xs,
                            fontWeight: 600,
                            color: theme.colors.neutral[900],
                            marginBottom: '90px',
                            textAlign: 'center'
                        }}>
                            Bem vindo! Faça seu login abaixo
                        </Paragraph>

                        <form>
                            <InputGroup>
                                <Label>E-mail</Label>
                                <Input 
                                    placeholder="nome@email.com" 
                                />
                            </InputGroup>

                            <InputGroup styleSheet={{
                                marginBottom: theme.space['x1.5']
                            }}>
                                <Label>Senha</Label>
                                <Input 
                                    type="password" 
                                    placeholder="********" 
                                />
                            </InputGroup>
                            <Paragraph styleSheet={{
                                fontSize: theme.space.x3,
                                fontWeight: 600,
                                color: theme.colors.palette.orange,
                                textAlign: 'end',
                                marginBottom: theme.space.x6
                            }}>Esqueceu a senha?</Paragraph>
                            <Link href="/home">
                                <Button>ENTRAR</Button>
                            </Link>

                        </form>
                    </Box>
                    

                    <Paragraph 
                        styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize, 
                            fontWeight: 300,
                            textAlign: 'center',
                            marginTop: theme.space.x12
                        }}>
                            Não possui uma conta ainda? <Text styleSheet={{
                            color: theme.colors.palette.orange, 
                            fontWeight: 700
                        }}>
                             <Link href={'/register'}>
                                Registre-se
                            </Link>
                        </Text>
                    </Paragraph>
                </Page>
        </>
    )
}