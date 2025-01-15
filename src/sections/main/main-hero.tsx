import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function MainHero() {
  return (
    <Box
      sx={{
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: 'url(/assets/background/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'common.white',
      }}
    >
      <Container>
        <Stack
          spacing={3}
          justifyContent="center"
          sx={{
            height: { md: 560 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h1">
            울릉도로 떠나는
            <br /> 특별한 여행
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            선박 예약부터 숙소, 패키지 여행까지
            <br /> 울릉도 여행의 모든 것을 한 곳에서
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
