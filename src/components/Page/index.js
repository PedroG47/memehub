import { Box } from "../../theme/components"

export default function Page({children, styleSheet}){
    return(
        <Box styleSheet={{
            width: '100%',
            height: '100%',
            alignItems: 'center !important',
            justifyContent: 'center !important'
        }}>
            <Box styleSheet={{
                height: '100%',
                width: '430px',
                display: 'flex',
                flexDirection: 'column',
                ...styleSheet,
            }}>
                {children}
            </Box>
        </Box>
    )
}
Page.defaultProps = {
    styleSheet: {},
  };