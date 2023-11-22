import Head from 'next/head'
import { theme } from '../../../src/theme/theme'; 
import { Box, Input, Button, Label, InputGroup, Paragraph, Image } from "../../../src/theme/components";
import Page from '../../../src/components/Page';
import { Camera, UserCircle2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import request from '../../../src/utils/request';
import Link from '../../../src/components/Link';

export default function EditPage(){
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('');
    const [originalBirthday, setOriginalBirthday] = useState('');
    const [showModal, setShowModal] = useState(false);
    const initialUser = useRef(null);
    const [checkUser, setCheckUser] = useState(false)
    
    const [newUserName, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newBirthday, setNewBirthday] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const getUser = async () =>{
        let profile = await request(`/api/user/current/`, 'get');
        if(profile){
            setUser(profile.data);
        }
    }

    const handleSubmit = async () => {
        const updatedFields = {};
      
        if (username !== initialUser.current.username) {
          updatedFields.Username = username;
        }
      
        if (email !== initialUser.current.email) {
          updatedFields.Email = email;
        }
      
        if (birthday !== originalBirthday) {
          updatedFields.Birthday = birthday;
        }
      
        if (password !== '') {
          updatedFields.Password = password;
        }
      
        try {
          const response = await request(`/api/user/${user.id}`, 'put', updatedFields).then(
             window.location.href = `/profile/${user.id}`
          )
            
          setNewUsername('');
          setNewEmail('');
          setNewBirthday('');
          setNewPassword('');
        } catch (error) {
          console.error('Erro ao enviar dados para a API:', error);
        }
      };

    const submitChangePassword = (newPassword) => {
        setPassword(newPassword)
    }

    const handleChangePassword = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
    
    
    useEffect(() => {
        getUser()
    }, []);

    useEffect(() => {
        if(user){
            initialUser.current = user;
            setOriginalBirthday(user.birthday.split('T')[0]);
            setBirthday(user.birthday.split('T')[0]);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    return user && (
        <>
            <Head>
                <title>Editar Perfil - MemeHub</title>
            </Head>
            <Page styleSheet={{
                    paddingLeft: theme.space['x2.5'],
                    paddingRight: theme.space['x2.5'],
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
            }}>
                <Box styleSheet={{
                    position: 'relative'
                }}>
                    <Link href={`/profile/${user.id}`}>
                        <Image 
                            src="/images/arrow_forward.svg" 
                            styleSheet={{
                                position: 'absolute',
                                top: '3%',
                                left: '4%',
                                transform: 'rotate(180deg)',
                            }}
                        ></Image>
                    </Link>

                    <Box styleSheet={{
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <UserCircle2 style={{marginTop: theme.space.x7, marginBottom: theme.space.x5 }} height={140} width={140}></UserCircle2>
                        <Box styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: theme.space.x5,
                            paddingRight: theme.space.x5,
                            paddingTop: theme.space['x2.5'],
                            paddingBottom: theme.space['x2.5'],
                            backgroundColor: 'rgba(249, 249, 249, 1)',
                            gap: theme.space['x3.5'],
                            borderRadius: theme.space.x12,
                            marginBottom: theme.space.x12
                        }}>
                            <Camera></Camera>
                            <Paragraph styleSheet={{marginBottom: 0}}>Alterar foto de perfil</Paragraph>
                        </Box>
                    </Box>
                    

                    <form>
                        <InputGroup>
                            <Label>Seu nome de usuário</Label>
                            <Input 
                                icon={'/images/alternate_email.svg'}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Sua data de nascimento</Label>
                            <Input 
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Seu e-mail</Label>
                            <Input 
                                placeholder="nome@email.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup styleSheet={{
                        }}>
                            <Label>Sua senha</Label>
                            <Box styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: `${theme.space.x3} ${theme.space. x4} `,
                                backgroundColor: theme.colors.neutral['050'],
                                borderRadius: theme.space.x12,
                                cursor: 'pointer',
                            }} onClick={handleChangePassword}>
                                <Box styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: theme.space['x2.5']
                                }}>
                                    <Image src="/images/lock.svg"></Image>
                                    <Paragraph styleSheet={{margin: 0, fontSize: theme.typography.variants.body3.fontSize}}>Alterar minha senha</Paragraph>
                                </Box>
                                <Image src="/images/arrow_forward.svg"></Image>
                            </Box>
                        </InputGroup>
                        
                    </form>
                </Box>

                {showModal && (
                    <ModalComponent onClose={closeModal} handleSubmit={submitChangePassword}/>
                )}

                <Box styleSheet={{
                    marginBottom: theme.space.x4
                }}>
                    <Button onClick={handleSubmit}>SALVAR</Button>
                </Box>
            </Page>
        </>
    )
}

export function ModalComponent({ onClose, handleSubmit }){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
    }

    const validateFormInput = () => {
        let inputError = {
            newPassword: "",
            confirmPassword: "",
        };

        if (confirmPassword !== newPassword) {
            setFormError({
              ...inputError,
              confirmPassword: "A senha e a senha de confirmação devem ser iguais",
            });
            return false;
        }

        if (newPassword.length < 8) {
            setFormError({
              ...inputError,
              newPassword: "A senha deve ter pelo menos 8 caracteres",
            });
            return false;
        }

        setFormError(inputError);
        return true;
    }

    const submitChangePassword = (e) => {
        e.preventDefault();

        const isFormValid = validateFormInput();

        if(isFormValid){
            handleSubmit(newPassword);
        }
    };

    return (
        <Box styleSheet={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
        }} onClick={handleOverlayClick}>
            <Box
                styleSheet={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: `${theme.space['x2.5']} ${theme.space['x2.5']} 0 0 `,
                    boxShadow: `0 -3px 10px -5px ${theme.colors.neutral[999]}43`,
                    position: 'relative'
                }}
            >
                <Paragraph styleSheet={{
                    textAlign: 'center',
                    marginBottom: theme.space.x8
                }}>Alteração de senha</Paragraph>
                <Box styleSheet={{
                    position: 'absolute',
                    top: '4%',
                    right: '4%',
                    cursor: 'pointer'
                }} onClick={onClose}>
                    <X/>
                </Box>

                <form onSubmit={submitChangePassword}>
                    <InputGroup >
                        <Label>Digite sua senha atual</Label>
                        <Input 
                            icon={'/images/lock.svg'}
                            type="password" 
                            placeholder="********" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Paragraph 
                            styleSheet={{
                                marginBottom: 0,
                                color: theme.colors.palette.error,
                                fontSize: theme.typography.variants.body4.fontSize
                            }}
                        >{formError.newPassword}</Paragraph>
                    </InputGroup>

                    <InputGroup styleSheet={{
                        marginBottom: theme.space.x11
                    }}>
                        <Label>Confirme sua nova senha</Label>
                        <Input 
                            icon={'/images/lock.svg'}
                            type="password" 
                            placeholder="********" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Paragraph 
                            styleSheet={{
                                marginBottom: 0,
                                color: theme.colors.palette.error,
                                fontSize: theme.typography.variants.body4.fontSize
                            }}
                        >{formError.confirmPassword}</Paragraph>
                    </InputGroup>

                    <Button>ALTERAR SENHA</Button>
                </form>
            </Box>
        </Box>
    )
}