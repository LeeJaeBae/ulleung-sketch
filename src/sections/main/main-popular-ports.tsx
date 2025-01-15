import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ----------------------------------------------------------------------

const PORTS = [
  {
    name: '포항',
    image: '/assets/ports/pohang.jpg',
    description: '포항여객선터미널에서 울릉도까지 약 3시간 소요',
  },
  {
    name: '강릉',
    image: '/assets/ports/gangneung.jpg',
    description: '강릉항에서 울릉도까지 약 2시간 30분 소요',
  },
  {
    name: '묵호',
    image: '/assets/ports/mukho.jpg',
    description: '묵호항에서 울릉도까지 약 2시간 40분 소요',
  },
];

// ----------------------------------------------------------------------

export default function MainPopularPorts() {
  return (
    <Box sx={{ py: { xs: 10, md: 15 } }}>
      <Container>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mb: { xs: 8, md: 10 },
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography variant="h2">인기 출발 항구</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            울릉도로 가는 주요 항구를 소개합니다
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {PORTS.map((port) => (
            <Card key={port.name}>
              <Box
                sx={{
                  pt: '100%',
                  position: 'relative',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${port.image})`,
                }}
              />

              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {port.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {port.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
