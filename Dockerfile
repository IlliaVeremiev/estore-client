FROM nginx

# Remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Vite build files to the nginx html directory
COPY dist /usr/share/nginx/html

# Expose port 80 for incoming requests
EXPOSE 80