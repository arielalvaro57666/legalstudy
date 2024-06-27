class ChatStatus:
    Request = "Request"
    Open = "Open"
    Closed = "Closed"

class WSUserType:
    AnonymousUser = "AnonymousUser"
    Admin = "Admin"

class WSMessageType:
    Chat = 1
    Request = 2
    

class WSMClientState:
    NameRequest = "name"
    CellphoneRequest = "cellphone"
    Done = "Done"
