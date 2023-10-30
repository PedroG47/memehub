import { Pencil, X } from "lucide-react";
import Page from "../../src/components/Page";
import { Image, Box, Line, Paragraph, InputGroup, Label, Input, Text, Button } from "../../src/theme/components";
import { theme } from "../../src/theme/theme";
import Link from "../../src/components/Link";
import { useState } from "react";
import { storage } from "../../src/firebase";
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { v4 } from "uuid"

export default function Create(){
    const [image, setImage] = useState(null);
    const [titleMeme, setTitleMeme] = useState('')
    const [percent, setPercent] = useState(0);
    const [ urlImage, setUrlImage] = useState(null)

    const onChangeImage = async (image) =>{
        setImage(image)
    }

    const handleEditarClick = () => {
        setImage(null);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!image) return
        const storageRef = ref(storage, `images/${image.name +  v4()}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrlImage(url)
                    window.location.href ="/home"
                });
            }
        )

        // console.log(titleMeme)
        // console.log(urlImage)
    };

    const handleTitleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 50) {
          setTitleMeme(inputValue);
        }
      };

    return(
        <Page styleSheet={{
            width: '430px'
        }}>
            <Box styleSheet={{
                display: 'flex',
                paddingTop: theme.space['x3.5'],
                paddingBottom: theme.space['x3.5'],
                paddingLeft: theme.space.x7,
                paddingRight: theme.space.x3,
                justifyContent: 'space-between',
            }}>
                <Paragraph styleSheet={{
                    fontSize: theme.typography.variants.body1.fontSize,
                    fontWeight: theme.typography.variants.body1.fontWeight,
                    marginBottom: 0,
                }}>Nova postagem</Paragraph>
                <Link href="/home">
                    <X color={theme.colors.neutral[900]} height={24} width={24}></X>
                </Link>
            </Box>
            <Line styleSheet={{
                marginTop: 0,
                marginBottom: theme.space.x7
            }}/>
            <Box styleSheet={{
                paddingLeft: theme.space.x3,
                paddingRight: theme.space.x3,
                height: '100%'
            }}>
                <form style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
                onSubmit={handleSubmit}
                >
                    <Box>
                        <InputGroup styleSheet={{
                            marginBottom: theme.space['x1.5']
                        }}>
                            <Label>Qual o título da sua postagem?</Label>
                            <Input 
                                placeholder="Diga algo sobre sue postagem."
                                value={titleMeme}
                                name="title" 
                                onChange={handleTitleChange}
                                maxLength={50}
                                autoComplete="off"
                            />
                        </InputGroup>
                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize,
                            fontWeight: 300,
                            color: theme.colors.neutral[900],
                            textAlign: 'end',
                            marginBottom: theme.space.x8
                        }}>{titleMeme.length}/50 caracteres</Paragraph>

                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize,
                            fontWeight: 600,
                            marginBottom: theme.space.x4,
                            paddingLeft: theme.space['x3.5']
                        }}>
                            Selecione uma imagem para a sua postagem
                        </Paragraph>

                        <Box styleSheet={{
                            width: '100%',
                            height: image ? 'auto' :'369px' ,
                            border: `1px solid ${theme.colors.neutral[100]}`,
                            borderRadius: theme.space['x2.5'],
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {image ? 
                            <Box styleSheet={{
                                position: 'relative',
                                width: '100%'
                            }}>
                                <Box styleSheet={{
                                    display: 'flex',
                                    gap: '5px',
                                    position: 'absolute',
                                    top: '3%',
                                    right: '3%',
                                    backgroundColor: theme.colors.neutral[100],
                                    padding: '6px 8px',
                                    borderRadius: theme.space.x2
                                }}
                                    onClick={handleEditarClick}
                                >
                                    <Pencil height={18} width={18}></Pencil>
                                    <Paragraph styleSheet={{
                                        marginBottom: 0,
                                        lineHeight: '100%'
                                    }}>Editar</Paragraph>
                                </Box>
                                <Image src={URL.createObjectURL(image)} styleSheet={{
                                    borderRadius: theme.space.x2
                                }}></Image> 
                            </Box> :
                            <Box styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image width={80} src="/images/add_a_photo.svg" styleSheet={{marginBottom: theme.space.x5}}/>

                                <InputGroup>
                                    <Label htmlFor="memeImage" styleSheet={{
                                        padding: `${theme.space['x2.5']} ${theme.space.x7}` ,
                                        border: `1px solid ${theme.colors.palette.orange}`,
                                        borderRadius: theme.space.x12,
                                        color: theme.colors.palette.orange
                                    }}>SELECIONAR FOTO</Label>
                                    <Input
                                        id="memeImage"
                                        type="file"
                                        accept="image/*"
                                        styleSheet={{
                                            display: 'none'
                                        }}
                                        onChange={(e) => {onChangeImage(e.target.files[0])}}
                                    />
                                </InputGroup>
                            </Box>
                            
                            }
                            

                        </Box>
                    </Box>
                    <Button 
                    styleSheet={{
                        marginBottom: theme.space.x6
                    }}
                    type="submit">{percent ? 'Postando...' : 'Postar'}</Button>
                </form>

                
            </Box>


            
        </Page>
    )
}

export function ImageUpload({ onChange }) {
    console.log(onChange)
  
    return (
        <InputGroup>
            <Label htmlFor="memeImage" styleSheet={{
                padding: `${theme.space['x2.5']} ${theme.space.x7}` ,
                border: `1px solid ${theme.colors.palette.orange}`,
                borderRadius: theme.space.x12,
                color: theme.colors.palette.orange
            }}>SELECIONAR FOTO</Label>
            <Input
                id="memeImage"
                type="file"
                accept="image/*"
                styleSheet={{
                    display: 'none'
                }}
                onChange={onChange}
            />
        </InputGroup>
        
    );
  };