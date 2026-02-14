# Tempo Template - Deployment Guide

## Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change admin password to secure credential
- [ ] Test all features locally
- [ ] Configure production MongoDB
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure CORS for production domain
- [ ] Set `NODE_ENV=production`
- [ ] Optimize frontend build
- [ ] Set up proper logging
- [ ] Configure database backups
- [ ] Test payment integration (if applicable)
- [ ] Set up email service
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and alerts

---

## Environment Variables

### Production `.env` (Server)

```
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/tempo

# Security
JWT_SECRET=generate_strong_random_string_here
ADMIN_USERNAME=your_secure_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# CORS
FRONTEND_URL=https://yourdomain.com

# Optional: Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional: Cloud Storage
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your_bucket
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`
5. Create database backups
6. Enable IP whitelist

### Local MongoDB

1. Install MongoDB Community
2. Start MongoDB service
3. Create separate database for production
4. Set up regular backups

---

## Deployment Options

### Option 1: Heroku (Easiest)

**Backend**:
```bash
# Install Heroku CLI
heroku login
heroku create tempo-backend
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGO_URI=your_mongodb_url
git push heroku main
```

**Frontend**:
```bash
npm run build
# Deploy to Netlify or Vercel
```

### Option 2: AWS EC2

**Backend**:
```bash
# Launch EC2 instance
ssh -i key.pem ec2-user@instance-ip

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash
sudo yum install nodejs npm

# Clone and setup
git clone your-repo
cd tempo-template/server
npm install
npm start
```

**Frontend**:
```bash
npm run build
# Upload dist folder to S3/CloudFront
```

### Option 3: DigitalOcean App Platform

1. Push code to GitHub
2. Connect repository to DigitalOcean
3. Configure environment variables
4. Deploy automatically

### Option 4: Docker Deployment

**Backend Dockerfile**:
```dockerfile
FROM node:16
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
EXPOSE 5000
CMD ["npm", "start"]
```

**Build and Deploy**:
```bash
docker build -t tempo-backend .
docker run -e MONGO_URI=your_uri -p 5000:5000 tempo-backend
```

---

## Frontend Deployment

### Build for Production

```bash
cd client
npm run build
```

This creates optimized `dist/` folder.

### Deploy to Netlify

```bash
npm install -g netlify-cli
ntfy deploy --prod
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## HTTPS/SSL Setup

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

### With Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Production Environment Configuration

### CORS Configuration

Update in `server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Logging Setup

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'tempo-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## Monitoring & Logging

### Services to Consider

- **Monitoring**: New Relic, DataDog, Prometheus
- **Logging**: ELK Stack, Splunk, Papertrail
- **Error Tracking**: Sentry, Rollbar
- **Performance**: Google Analytics, Mixpanel
- **Uptime**: UptimeRobot, Pingdom

### Health Check Endpoint

Add to `server.js`:

```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});
```

---

## Database Backups

### MongoDB Atlas Backups

- Enable continuous backups in cluster settings
- Set up automated snapshots
- Daily retention for 7 days
- Monthly retention for 12 months

### Manual Backup Script

```bash
#!/bin/bash
BACKUP_DIR="/backups/mongo"
DATE=$(date +"%Y%m%d_%H%M%S")

mongodump --uri "$MONGO_URI" --out "$BACKUP_DIR/$DATE"

# Upload to S3
aws s3 cp "$BACKUP_DIR/$DATE" s3://your-bucket/backups/ --recursive
```

---

## Performance Optimization

### Backend

- [x] Enable gzip compression
- [x] Implement caching headers
- [x] Use database indexing
- [x] Implement pagination
- [x] Use connection pooling
- [x] Enable API rate limiting

### Frontend

- [x] Minify and bundle code
- [x] Lazy load components
- [x] Optimize images
- [x] Enable gzip compression
- [x] Use CDN for assets
- [x] Implement service workers

### Database

```javascript
// Create indexes
db.courses.createIndex({ teacherId: 1 });
db.courses.createIndex({ approved: 1 });
db.users.createIndex({ email: 1 });
```

---

## Security Hardening

### In Production

1. **HTTPS Only**: Redirect HTTP to HTTPS
2. **Security Headers**: Add helmet.js
3. **Input Validation**: Sanitize all inputs
4. **SQL Injection Prevention**: Use parameterized queries (already using MongoDB)
5. **CSRF Protection**: Add csrf-guard
6. **Secrets Management**: Use environment variables
7. **Database Encryption**: Enable at-rest encryption
8. **API Keys**: Rotate regularly
9. **Firewall**: Restrict access to necessary ports
10. **DDoS Protection**: Use CloudFlare or similar

### Install Security Packages

```bash
npm install helmet express-validator helmet-csp
```

### Use in Server

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## Scaling Strategy

### Horizontal Scaling

- Use load balancer (AWS ELB, NGINX)
- Deploy multiple backend instances
- Use session store (Redis) for authentication
- Database replication for failover

### Vertical Scaling

- Upgrade server resources
- Optimize database queries
- Implement caching layer (Redis)
- Use CDN for static content

### Database Scaling

- Enable sharding for large datasets
- Create read replicas
- Index frequently queried fields
- Archive old data

---

## Post-Deployment Testing

1. **API Testing**: Test all endpoints
2. **UI Testing**: Test all pages
3. **Authentication**: Test all login flows
4. **Payment**: Test transaction flow
5. **Mobile**: Test on mobile devices
6. **Load Testing**: Simulate high traffic
7. **Security**: Run penetration testing
8. **Analytics**: Verify tracking

---

## Monitoring Checklist

- [ ] API response times < 200ms
- [ ] Database queries < 100ms
- [ ] Uptime > 99.5%
- [ ] Error rate < 0.1%
- [ ] CPU usage < 70%
- [ ] Memory usage < 80%
- [ ] Disk usage < 85%
- [ ] Database replication lag < 1s

---

## Rollback Procedure

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Or use docker
docker pull tempo-backend:previous-version
docker run -d -p 5000:5000 tempo-backend:previous-version
```

---

## Incident Response

1. Identify issue
2. Page on-call engineer
3. Rollback if necessary
4. Post-mortem meeting
5. Implement preventive measures

---

## Documentation

Maintain updated documentation for:
- Deployment procedures
- Architecture diagrams
- Database schema
- API documentation
- Runbooks for common issues
- Change log

---

## Maintenance Schedule

- Daily: Monitor logs and alerts
- Weekly: Security patches
- Monthly: Performance review
- Quarterly: Database optimization
- Yearly: Major version upgrades

---

Successfully deployed! 🚀

For questions, refer to specific service documentation.
