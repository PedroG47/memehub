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