import { UserCircle2, X } from "lucide-react";
import Page from "../../src/components/Page";
import { Image, Box, Line, Paragraph, InputGroup, Label, Input, Text, Button } from "../../src/theme/components";
import { theme } from "../../src/theme/theme";
import Link from "../../src/components/Link";

export default function Home(){
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
                }}>
                    <Box>
                        <InputGroup styleSheet={{
                            marginBottom: theme.space['x1.5']
                        }}>
                            <Label>Qual o título da sua postagem?</Label>
                            <Input 
                                placeholder="Diga algo sobre sue postagem.." 
                            />
                        </InputGroup>
                        <Paragraph styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize,
                            fontWeight: 300,
                            color: theme.colors.neutral[900],
                            textAlign: 'end',
                            marginBottom: theme.space.x8
                        }}>0/50 caracteres</Paragraph>

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
                            height: '369px',
                            border: `1px solid ${theme.colors.neutral[100]}`,
                            borderRadius: theme.space['x2.5'],
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image width={80} src="/images/add_a_photo.svg" styleSheet={{marginBottom: theme.space.x5}}/>
                            <ImageUpload></ImageUpload>
                        </Box>
                    </Box>
                    <Button styleSheet={{
                        marginBottom: theme.space.x6
                    }}>Postar</Button>
                </form>

                
            </Box>


            
        </Page>
    )
}

export function ImageUpload({ onImageSelect }) {
  
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
            />
        </InputGroup>
        
    );
  };