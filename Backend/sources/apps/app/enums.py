import enum

class WSUserType(enum):
    Client = "Client"
    Admin = "Admin"

class WSUserSteps(enum):
    AskName = "Ask Name"
    AskCellphone= "Ask Cellphone"
    Chat = "Chat"