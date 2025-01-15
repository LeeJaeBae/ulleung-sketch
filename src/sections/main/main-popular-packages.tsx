import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ----------------------------------------------------------------------

const PACKAGES = [
  {
    name: '울릉도 핵심 코스 2박 3일',
    image: '/assets/packages/package-1.jpg',
    description: '독도, 행남해안산책로, 내수전 전망대 등 울릉도 핵심 관광지 투어',
    price: '399,000원',
  },
  {
    name: '울릉도 힐링 3박 4일',
    image: '/assets/packages/package-2.jpg',
    description: '여유로운 일정으로 즐기는 울릉도의 아름다운 자연과 맛있는 먹거리',
    price: '599,000원',
  },
  {
    name: '울릉도 완전일주 2박 3일',
    image: '/assets/packages/package-3.jpg',
    description: '울릉도의 모든 것을 경험하는 알찬 일정의 완전일주 코스',
    price: '449,000원',
  },
];

// ----------------------------------------------------------------------

export default function MainPopularPackages() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: 'background.neutral',
      }}
    >
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
          <Typography variant="h2">인기 패키지 여행</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            전문가가 엄선한 울릉도 패키지 여행
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
          {PACKAGES.map((pack) => (
            <Card key={pack.name}>
              <Box
                sx={{
                  pt: '75%',
                  position: 'relative',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${pack.image})`,
                }}
              />

              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {pack.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {pack.description}
                </Typography>

                <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                  {pack.price}부터
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
