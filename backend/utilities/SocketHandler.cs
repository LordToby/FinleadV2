using ElephantSQL_example;
using ElephantSQL_example.Controllers;
using Microsoft.AspNetCore.SignalR;

namespace websockets {
public class SocketHandler : Hub<IClient>
{

    private readonly PersonController _personController;


    public SocketHandler(PersonController personController)
    {
           _personController = personController;
    }

    public async Task SendMessage(string message){
        Console.WriteLine("Modtaget besked fra klient");
        await Clients.All.ReceiveMessage("Server har Modtaget startbesked");
    }

    public async Task SendData(Person message)
    {
        
        Console.WriteLine("Hej person " + message.country);


        message.birthDay = DateTime.UtcNow;
        await _personController.AddPerson(message);

        //Beksed der sendes tilbage til clienterne.
        await Clients.All.ReceiveMessage("Jeg har modtaget mit data, nu får du dit lort igen! ");
    }
}

}