## [0.6] - ?
Frontend 
- WebsocketService now hashmap websocket dependending on the websocket type
- Panelchat for dashboard (connected chats and viceversa)
- Panelchat component filter between on and off chats 
- Panelchat component refresh chats everytimes admin websocket notifies
- panelchat init admin websocket
- Chat design for admin dashboard
- Chat component in dashboard returned with key prop(roomID) allowing swaping between chats when state changes  
- Chat component conditions for admin and props for checking the user and if data chat exists
- Chat component restore messages if admin passed chat_data prop
- Admin sidebar options routing
- TODO: Finish Home page with some numbers and presentation
- TODO: Check if admin close websocket when swaps to another chat
Backend
- Admin WS consumer to notify chat changes to admin
- Chat Model method notifies adminconsumer if status changed
- Changes on Messagetype Enum to WSType Enum
- Chat list and chat retrieve endpoints
- TODO: Create statistics Model for admin

## [0.5] - 2024-6-27
Frontend
- Chat creation returns uuid4 as Response 
- Chat only shows if chat was succesfuly created
Backend
- Websocket TokenAuthMiddleware routing 
- Websocket chatConsumer use scope for check the usertype 
- Websocket Consumer save functions for client, chat status and message data 
- Transform chat roomID in PK and default uuid4 from model

## [0.4] - 2024-6-26
Frontend
- Admin routes (Login Page Done)
- Authentication logic for protected routes with HOC 
- Credentials include httprequest for sending cookie back to authentication 
- http service return status and response 
Backend
- Simple Authentication Token stored in database 
- Login logic
- Renew token if expired (not refresh token traditional)
- Veifiy endpoint for initial authentication
- Token authentication class overwrite for cookie token check
- Modified views with permission and authentication classes

## [0.3] - 2024-6-23
Frontend
- Remake of chat component
- Centralized websocket configuration
Backend
- Websocket configuration for Django
- Websocket consumer for the chat
- Chat model for saving websocket IDs

## [0.2] - 2024-5-21
### Added
Frontend
- Reestructuring labor-formula component...
Backend
- Django Rest for backend
- core and app added
- Compensation Calculo (strategy pattern) - open and close principle objective
- Dates for Compesentation Calculo (also strategy)

## [0.1] - 2024-5-18
### Added
Frontend
- New structural pattern for the project and versions log 
- Changed single information components for a dynamic information component
- Map component (Maps list of component)
- Service injection for display-information component


