class ChatStatus:
    Request = "Request"
    Open = "Open"
    Closed = "Closed"

class WSUserType:
    AnonymousUser = "AnonymousUser"
    Admin = "Admin"

class WSType:
    Chat = 0
    Admin = 1
    
class WSMClientState:
    NameRequest = "name"
    CellphoneRequest = "cellphone"
    Done = "Done"

class  WSNotificationType:
    chatChanged = 0