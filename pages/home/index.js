import { UserCircle2 } from "lucide-react";
import Page from "../../src/components/Page";
import Link from "../../src/components/Link";
import { Image, Box, Line, Paragraph } from "../../src/theme/components";
import { theme } from "../../src/theme/theme";


export default function Home(){
    return(
        <Page>
            <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: theme.space.x2
            }}>
                <Image src="/images/logo.svg" 
                    styleSheet={{
                        height: '36px',
                    }}
                />
                <Line/>

                <Paragraph styleSheet={{
                    textAlign: 'center',
                    color: theme.colors.neutral[900],
                    fontSize: theme.typography.variants.body3.fontSize,
                    fontWeight: 600
                }}>For You</Paragraph>
            </Box>

            <Box styleSheet={{
                minHeight: 'calc(100% - 160px)',
                overflowY: 'scroll',
                paddingRight: theme.space.x5,
                paddingLeft: theme.space.x5,
            }}>
                <Painel></Painel>
                <Painel></Painel>

            </Box>

            <Box as="footer"
                styleSheet={{
                    width: '100%',
                    height: theme.space.x12,
                    display: 'flex',
                    justifyContent: 'space-around',
                    backgroundColor: theme.colors.neutral['000'],
                    padding: '9px'
                }}
            >
                <Link  href="/home">
                    <Image width={32} height={32} src="/images/home.svg"/>
                </Link>
                <Link href="/create">
                    <Image width={32}  height={32} src="/images/add_circle.svg"/>
                </Link>
                <Image  width={32}  height={32} src="/images/account_circle.svg"/>
            </Box>
            
        </Page>
    )
}

export function Painel(){
    return(
        <Box styleSheet={{
            width: '100%',
            backgroundColor: theme.colors.neutral['000'],
            border: `1px solid ${theme.colors.neutral[100]}`,
            marginBottom: theme.space.x5,
            borderRadius: theme.space['x2.5'],
            boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}43`
        }}>
            <Box styleSheet={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: theme.space['x2.5'],
                paddingLeft: theme.space['x3.5'],
                paddingRight:  theme.space['x3.5'],
                justifyContent: 'space-between',
                marginBottom: theme.space['x2.5']
            }}>
                <Box styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.space.x2,
                }}>
                    <UserCircle2 height={27} width={27}></UserCircle2>
                    <Paragraph styleSheet={{
                        marginBottom: 0
                    }}>
                        Usuário
                    </Paragraph>
                </Box>
                <Paragraph styleSheet={{
                    marginBottom: 0,
                    fontSize: theme.typography.variants.body4.fontSize
                }}>10 min</Paragraph>
            </Box>
            <Box>
                <Paragraph
                    styleSheet={{
                        marginLeft: theme.space['x3.5'],
                        fontSize: theme.typography.variants.body1.fontSize,
                        fontWeight: 700,
                        color: theme.colors.palette.black,
                        marginBottom: theme.space.x2
                    }}
                >Hoje eu tô só esse meme</Paragraph>
            </Box>
            <Box styleSheet={{
                height: 'auto',
                width: 'auto',
                borderRadius: theme.space.x5,
                marginBottom: theme.space.x3
            }}>
                <Image src="/images/meme1.png"></Image>
            </Box>
            <Box styleSheet={{
                marginLeft: theme.space.x6
            }}>
                <Box styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.space.x2,
                    marginBottom: theme.space.x4
                }}>
                    <Image height={24} width={24} src="/images/thumb_up.svg"></Image>
                    <Paragraph
                        styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize,
                            marginBottom: 0,
                            marginRight: theme.space.x7
                        }}
                    >49 gostaram</Paragraph>
                    <Image height={24} width={24} src="/images/thumb_down.svg"></Image>
                    <Paragraph
                        styleSheet={{
                            fontSize: theme.typography.variants.body3.fontSize,
                            marginBottom: 0,
                            marginRight: theme.space.x7
                        }}
                    >3 gostaram</Paragraph>
                </Box>
                <Paragraph 
                    styleSheet={{
                        fontSize: theme.typography.variants.body3.fontSize,
                        color: theme.colors.palette.orange,
                        fontWeight: 400
                    }}
                >Ver todos os 10 Comentários</Paragraph>
            </Box>
        </Box>
    )
}