namespace AykomePanel.ClassHome._Request
{
    public class Parameter2
    {
        public String? Param1 { get; set; }
        public String? Param2 { get; set; }
    }
    public class Parameter3 : Parameter2
    {
        public String? Param3 { get; set; }
    }

    public class Parameter4 : Parameter3
    {
        public String? Param4 { get; set; }
    }
    public class Parameter5 : Parameter4
    {
        public String? Param5 { get; set; }
    }
    public class Parameterobj3 
    {
        public object? Param1 { get; set; }
        public object? Param2 { get; set; }
        public object? Param3 { get; set; }
    }
}
