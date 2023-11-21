import Page from "../../src/components/Page";
import Link from "../../src/components/Link";
import { Image, Box, Line, Paragraph, Tab, Tabs } from "../../src/theme/components";
import { theme } from "../../src/theme/theme";
import { MoreVertical, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { tokenService } from "../../src/services/auth/tokenService";
import { useRouter } from "next/router";
import request from "../../src/utils/request";

export default function Profile(){
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState([])
    const [profileTab, setProfileTab] = useState('posts');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();
    const userId = router.query.id; 

    const handleTabChange = (profile) => {
        setProfileTab(profile);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handleExit = () => {
        window.location.href = '/'
        tokenService.delete()
    }

    const getPosts = async () => {
        let postsData = await request(`/api/post/user/${userId}`, 'get');
        setPosts(postsData.data);
    }

    const getLikes = async () =>{
        let likesData = await request(`/api/post/current/likes`, 'get')
        setLikes(likesData.data)
    }

    const getUser = async () => {
        let userData = await request(`/api/user/${userId}`, 'get');
        setUser(userData.data);
    }

    useEffect(() => {
        if(userId){
            getPosts()
            getLikes()
            getUser()
        }
    }, [userId]);

    return user && posts && likes && (
        <Page>
            <Box styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: theme.space.x2,
            }}>
                <Image src="/images/logo.svg" 
                    styleSheet={{
                        height: '36px',
                    }}
                />
                <Line/>

                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <Box styleSheet={{
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        cursor: 'pointer',
                        hover: {
                            opacity: '.8',
                        },
                    }} onClick={toggleDropdown}>
                        <MoreVertical></MoreVertical>
                    </Box>
                    {dropdownVisible && (
                        <Box styleSheet={{
                            position: 'absolute',
                            top: '20%', 
                            right: '8%',
                            border: '1px solid rgba(232, 232, 232, 1)' ,
                            textAlign: 'center',
                            borderRadius: theme.space['x1.5'],
                            paddingTop: theme.space['x2.5'],
                            paddingLeft: theme.space['x2.5'],
                            paddingRight: theme.space['x2.5'],
                            boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}43`
                        }}>
                            <Link  href="/profile/edit">
                                <Box
                                    styleSheet={{
                                        paddingBottom: theme.space.x2,
                                        borderBottom: '1px solid rgba(232, 232, 232, 1)',
                                        marginBottom: theme.space.x2,
                                        cursor: 'pointer',
                                        hover: {
                                            opacity: '.8',
                                        },
                                    }}
                                >
                                    <Paragraph 
                                        styleSheet={{
                                            marginBottom: 0,
                                            fontSize: theme.typography.variants.body3.fontSize,
                                            fontWeight: 400
                                        }}>Editar</Paragraph>
                                </Box>
                            </Link>
                            <Box 
                                onClick={handleExit}
                                styleSheet={{
                                    paddingBottom: theme.space.x2
                                }}
                            >
                                <Paragraph 
                                    styleSheet={{
                                        marginBottom: 0,
                                        fontSize: theme.typography.variants.body3.fontSize,
                                        fontWeight: 400,
                                        cursor: 'pointer',
                                        hover: {
                                            opacity: '.8',
                                        },
                                    }}>Sair</Paragraph>
                            </Box>
                        </Box>
                    )}
                    <UserCircle2 style={{marginBottom: theme.space.x3}} height={140} width={140}></UserCircle2>
                    <Paragraph styleSheet={{
                        fontSize: theme.typography.variants.heading3.fontSize.xs,
                        fontWeight: 600
                    }}>@{user.username}</Paragraph>
                </Box>

                <Tabs styleSheet={{
                    width: '100%',
                    borderBottom: '1px solid rgba(232, 232, 232, 1)'
                }}>
                    <Tab value="posts" selected={profileTab === 'posts'} onChange={() => handleTabChange('posts')} styleSheet={{width: '100%'}}>
                        <Box styleSheet={{
                            textAlign: 'center',
                            marginBottom: theme.space['x3.5'],
                        }}>
                            <Paragraph styleSheet={{
                                marginBottom: 0,
                                fontSize: theme.typography.variants.body1.fontSize,
                                fontWeight: 700
                            }}>{posts.length}</Paragraph>
                            <Paragraph styleSheet={{
                                marginBottom: 0,
                                fontSize: theme.typography.variants.body3.fontSize,
                                fontWeight: 400,
                                color: 'rgba(119, 119, 119, 1)'
                            }}>Posts</Paragraph>
                        </Box>
                    </Tab>
                    <Tab value="likes" selected={profileTab === 'likes'} onChange={() => handleTabChange('likes')} styleSheet={{width: '100%'}}>
                        <Box styleSheet={{
                        textAlign: 'center',
                        marginBottom: theme.space['x3.5']
                    }}>
                            <Paragraph styleSheet={{
                                marginBottom: 0,
                                fontSize: theme.typography.variants.body1.fontSize,
                                fontWeight: 700
                            }}>
                                {likes.length}
                            </Paragraph>
                            <Paragraph styleSheet={{
                                marginBottom: 0,
                                fontSize: theme.typography.variants.body3.fontSize,
                                fontWeight: 400,
                                color: 'rgba(119, 119, 119, 1)'
                            }}>Likes</Paragraph>
                        </Box>
                    </Tab>
                </Tabs>
            </Box>

            <Box styleSheet={{
                minHeight: 'calc(100% - 388px)',
                overflowY: 'scroll',
                paddingTop: theme.space.x5,
                paddingRight: theme.space['x2.5'],
                paddingLeft: theme.space['x3.5'],
                
            }}>
                {profileTab === 'posts' && (
                    <Box styleSheet={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px 13px',
                    }}>
                        {posts && posts.map((post, index) => {
                            return (
                                <Preview post={post} key={index}></Preview>
                            )
                        })}
                    </Box>
                )}
                {profileTab === 'likes' && (
                     <Box styleSheet={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px 13px',
                    }}>
                        {likes && likes.map((like, index) => {
                            return (
                                <PreviewLikes like={like} key={index}></PreviewLikes>
                            )
                        })}
                    </Box>
                )}
                
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

export function Preview(post, key){
    return(
        <Box key={key}>
            <Image styleSheet={{
                width: '189px',
                height: '189px',
                borderRadius: theme.space['x2.5'],
            }} src={post.post.imageUrl} title={post.post.title}></Image>
        </Box>
    )
}

export function PreviewLikes(like, key){
    return(
        <Box key={key}>
            <Image styleSheet={{
                width: '189px',
                height: '189px',
                borderRadius: theme.space['x2.5'],
            }} src={like.like.url}></Image>
        </Box>
    )
}