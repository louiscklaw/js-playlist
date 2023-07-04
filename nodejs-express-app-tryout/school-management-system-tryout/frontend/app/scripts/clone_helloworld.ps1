# Xcopy /E /I  helloworld restaurant_cms_helloworld

remove-item -R -Force rest_cms 
# remove-item -R -Force swagger_helloworld
robocopy helloworld rest_cms /MIR /XD "node_modules" /XD ".next"
