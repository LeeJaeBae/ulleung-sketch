import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'mingcute:location-fill',
    title: '가까운 항구 찾기',
    description: '내 위치에서 가장 가까운 울릉도행 항구를 찾아보세요.',
  },
  {
    icon: 'mingcute:ship-fill',
    title: '선박 예약',
    description: '울릉도로 가는 선박을 간편하게 예약하세요.',
  },
  {
    icon: 'mingcute:hotel-fill',
    title: '리조트 예약',
    description: '울릉도의 다양한 숙소를 한눈에 비교하고 예약하세요.',
  },
  {
    icon: 'mingcute:route-fill',
    title: '패키지 여행',
    description: '전문가가 준비한 울릉도 패키지 여행을 만나보세요.',
  },
];

// ----------------------------------------------------------------------

export default function MainFeatures() {
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
          <Typography variant="h2">울릉스케치와 함께하는 여행</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            울릉도 여행의 시작부터 끝까지 울릉스케치가 함께합니다
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {FEATURES.map((feature) => (
            <Grid key={feature.title} item xs={12} sm={6} md={3}>
              <Stack
                spacing={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  textAlign: { xs: 'center', md: 'unset' },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    mx: { xs: 'auto', md: 'unset' },
                  }}
                >
                  <Iconify icon={feature.icon} width={32} />
                </Box>

                <Stack spacing={1}>
                  <Typography variant="h6">{feature.title}</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
