using ElephantSQL_example;

namespace websockets{
 public interface IClient
    {
        Task ReceiveMessage(string message);
    }
}