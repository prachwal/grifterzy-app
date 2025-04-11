import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    { id: 1, name: 'Jan Kowalski', role: 'CEO & Founder', avatar: '👨‍💼' },
    { id: 2, name: 'Anna Nowak', role: 'CTO', avatar: '👩‍💻' },
    { id: 3, name: 'Piotr Wiśniewski', role: 'Lead Designer', avatar: '👨‍🎨' },
    { id: 4, name: 'Maria Dąbrowska', role: 'Marketing Director', avatar: '👩‍💼' }
  ];
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('about.title', 'About Us')}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {t('about.ourStory', 'Our Story')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography paragraph>
          {t('about.storyParagraph1', 'Grifterzy was founded in 2020 with a mission to revolutionize the way businesses manage their operations. Our team of dedicated professionals has been working tirelessly to create intuitive, powerful software solutions that help organizations of all sizes thrive in today\'s competitive landscape.')}
        </Typography>
        
        <Typography paragraph>
          {t('about.storyParagraph2', 'What started as a small startup has grown into a company trusted by hundreds of clients worldwide. We pride ourselves on our innovative approach, customer-centric philosophy, and commitment to excellence in everything we do.')}
        </Typography>
        
        <Box 
          sx={{ 
            height: 200, 
            width: '100%', 
            bgcolor: 'action.hover', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            my: 3,
            borderRadius: 1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            [Company Image]
          </Typography>
        </Box>
        
        <Typography paragraph>
          {t('about.storyParagraph3', 'Today, our suite of products serves diverse industries including retail, healthcare, finance, and education. We continue to expand our offerings and enhance our solutions based on customer feedback and emerging market needs.')}
        </Typography>
      </Paper>
      
      <Typography variant="h5" gutterBottom>
        {t('about.ourTeam', 'Our Team')}
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {teamMembers.map(member => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ 
                p: 2, 
                display: 'flex', 
                justifyContent: 'center', 
                bgcolor: 'action.hover'
              }}>
                <Typography variant="h2" component="div">
                  {member.avatar}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('about.contactUs', 'Contact Us')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography paragraph>
          {t('about.contactText', 'We\'d love to hear from you! Whether you have a question about our products, pricing, or just want to say hello, our team is ready to answer all your questions.')}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>{t('about.email', 'Email')}:</strong> contact@grifterzy.com
          </Typography>
          <Typography variant="body1">
            <strong>{t('about.phone', 'Phone')}:</strong> +48 123 456 789
          </Typography>
          <Typography variant="body1">
            <strong>{t('about.address', 'Address')}:</strong> ul. Przykładowa 123, 00-000 Warszawa, Polska
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default About;
