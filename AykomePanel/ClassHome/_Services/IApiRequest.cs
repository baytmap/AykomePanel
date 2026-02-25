using AykomePanel.ClassHome._Home;

namespace AykomePanel.ClassHome._Services
{
    public interface IApiRequest
    {
        String urlRoot { get; }
        Task<string> GetAsync(string Methot);
        Task<string> GetAsync(string Methot, KeyVal? Header);
        Task<string> GetAsync(string Methot, KeyVal[]? Header);
        Task<string> GetProjeListAsync(string Methot); // Yeni eklenen method

        Task<string> PostJsonAsync(string Methot, string jsonData);
        Task<string> PostJsonAsync(string Methot, string jsonData, KeyVal? Header);
        Task<string> PostJsonAsync(string Methot, string jsonData, KeyVal[]? Header);
        
        Task<string> PostFileAsync(string Methot, IFormFile file, KeyVal[]? Header);



        Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData);
        Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData, KeyVal? Header);
        Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData, KeyVal[]? Header);


        Task<string> PutJsonAsync(string Methot, string jsonData);
        Task<string> PutJsonAsync(string Methot, string jsonData, KeyVal? Header);
        Task<string> PutJsonAsync(string Methot, string jsonData, KeyVal[]? Header);

        Task<string> DeleteJsonAsync(string Methot);
        Task<string> DeleteJsonAsync(string Methot, KeyVal? Header);
        Task<string> DeleteJsonAsync(string Methot, KeyVal[]? Header);


    }
}
