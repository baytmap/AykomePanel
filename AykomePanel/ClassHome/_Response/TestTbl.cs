using NetTopologySuite.Geometries;
using NpgsqlTypes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace AykomePanel.ClassHome._Response
{
    public class IdSira
    {
        [Key]
        public int ID { get; set; }
        public required int Sira { get; set; } = 1;
    }
    public class IdSiraAktif
    {
        [Key]
        public int ID { get; set; }
        public required int Sira { get; set; } = 1;
        public required bool Aktif { get; set; } = true;
    }
    #region Katman Veri Modeli
    public class Il : IdSiraAktif
    {
        [Display(Name = "Il Adı")]
        public required string Adi { get; set; }
        public List<Ilce>? Ilces { get; set; }

    }

    public class Ilce : IdSiraAktif
    {
        [Display(Name = "Ilçe Adı")]
        public required string Adi { get; set; }

        [Display(Name = "Il Adı")]
        public required int IlID { get; set; }
        public Il? Il { get; set; }
    }

    public class CizimTip
    {
        public int ID { get; set; }

        [Display(Name = "Çizim Tipi")]
        public required string CizimTipi { get; set; }
        public List<Katman>? Katmans { get; set; }
    }

    public class InputTip
    {
        public int ID { get; set; }

        [Display(Name = "İnput Tipi")]
        public required string InputTipi { get; set; }
        public List<KatmanProperties>? KatmanPropertiess { get; set; }
    }

    public class Katman : IdSiraAktif
    {

        public required int CizimTipID { get; set; }
        public CizimTip? CizimTip { get; set; }


        [Display(Name = "Katman Adı")]
        public required string KatmanAdi { get; set; }


        [Display(Name = "Açıklama")]
        public string? Aciklama { get; set; } = String.Empty;


        [Display(Name = "Renk Kodu")]
        public required string RenkKodu { get; set; } = "#efefef";

        [Display(Name = "Width")]
        public required int CzmWidth { get; set; } = 1;

        public List<KatmanProperties>? KatmanPropertiess { get; set; }
        public List<KatmanDeger>? KatmanDegers { get; set; }

    }

    public class KatmanProperties : IdSiraAktif
    {

        public required int KatmanID { get; set; }
        public Katman? Katman { get; set; }

        [Display(Name = "Değer")]
        public required string Deger { get; set; }

        public required int InputTipID { get; set; }
        public InputTip? InputTip { get; set; }

        [Display(Name = "Zorunlu Alan")]
        public required bool ZorunluAlan { get; set; }

        [Display(Name = "Min")]
        public string? Min { get; set; }

        [Display(Name = "Max")]
        public string? Max { get; set; }

        [Display(Name = "Step")]
        public string? Step { get; set; }

        [Display(Name = "RegexPaternn")]
        public string? RegexPaternn { get; set; }

        [Display(Name = "Foreign Tablo")]
        public string? ForeignTbl { get; set; }

        [Display(Name = "Foreign Tablo Primary")]
        public string? ForeignTblPrimary { get; set; }

        [Display(Name = "Foreign Tablo Alias")]
        public string? ForeignTblAlias { get; set; }

        [Display(Name = "İlişkili Foreign")]
        public bool IliskiliForeign { get; set; } = false;
        public List<KatmanDegerProperties>? KatmanDegerPropertiess { get; set; }
    }

    public class KatmanDeger
    {
        public int ID { get; set; }
        public required int KatmanID { get; set; }
        public Katman? Katman { get; set; }

        [JsonConverter(typeof(GeometryConverter))]
        public required Geometry GeometryDeger { get; set; }
    }

    public class KatmanDegerProperties
    {
        public int ID { get; set; }

        public required int KatmanPropertiesID { get; set; }
        public KatmanProperties? KatmanProperties { get; set; }


        [Display(Name = "Değer")]
        public required string Deger { get; set; }
    }

    #endregion


    public class GeometryConverter : JsonConverter<Geometry>
    {
        public override Geometry Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Json okuyucudan geometri değerini al
            JsonDocument doc = JsonDocument.ParseValue(ref reader);
            JsonElement root = doc.RootElement;

            // Geometry türüne dönüştür
            string? type = root.GetProperty("type").GetString();
            JsonElement coordinates = root.GetProperty("coordinates");

            switch (type)
            {
                case "Point":
                    double x = coordinates[0].GetDouble();
                    double y = coordinates[1].GetDouble();
                    return new Point(x, y);
                case "MultiPoint":
                    var multiPointCoordinates = ParseMultiPointCoordinates(coordinates);
                    return new MultiPoint(multiPointCoordinates.ToArray());
                case "LineString":
                    var lineStringCoordinates = ParseCoordinatesArray(coordinates);
                    return new LineString(lineStringCoordinates.ToArray());
                case "MultiLineString":
                    var multiLineStringCoordinates = ParseMultiLineStringCoordinates(coordinates);
                    return new MultiLineString(multiLineStringCoordinates.ToArray());
                case "Polygon":
                    var polygonCoordinates = ParsePolygonCoordinates(coordinates);
                    return new Polygon(new LinearRing(polygonCoordinates.ToArray()));
                case "MultiPolygon":
                    var multiPolygonCoordinates = ParseMultiPolygonCoordinates(coordinates);
                    return new MultiPolygon(multiPolygonCoordinates.ToArray());
                default:
                    throw new NotSupportedException($"Geometry type '{type}' is not supported.");
            }













            //// Geometry türüne göre nesne oluştur
            //if (type == "Point")
            //{
            //    // Point geometrisi oluştur
            //    double x = coordinates[0].GetDouble();
            //    double y = coordinates[1].GetDouble();
            //    return new Point(x, y);
            //}
            //else if (type == "Polygon")
            //{
            //    JsonElement coordinateArray = coordinates[0]; // Koordinat dizisi
            //    List<Coordinate> polygonCoordinates = new List<Coordinate>();
            //    foreach (JsonElement coordinateElement in coordinateArray.EnumerateArray())
            //    {
            //        double x = coordinateElement[0].GetDouble();
            //        double y = coordinateElement[1].GetDouble();
            //        polygonCoordinates.Add(new Coordinate(x, y));
            //    }
            //    polygonCoordinates.Add(polygonCoordinates[0]); // İlk noktayı sona ekle
            //    LinearRing linear = new LinearRing(polygonCoordinates.ToArray());
            //    return new Polygon(linear);
            //}
            //else if (type == "LineString")
            //{
            //    // Point geometrisi oluştur
            //    double x = coordinates[0].GetDouble();
            //    double y = coordinates[1].GetDouble();
            //    return new LineString(x, y);
            //}
            //else if (type == "Point")
            //{
            //    // Point geometrisi oluştur
            //    double x = coordinates[0].GetDouble();
            //    double y = coordinates[1].GetDouble();
            //    return new LineString(x, y);
            //}
            //else
            //{
            //    // Diğer geometri türlerini burada ele alabilirsiniz
            //    throw new NotSupportedException($"Geometry type '{type}' is not supported.");
            //}
        }
        private List<Coordinate> ParseCoordinatesArray(JsonElement coordinates)
        {
            var result = new List<Coordinate>();

            foreach (var coordinate in coordinates.EnumerateArray())
            {
                double x = coordinate[0].GetDouble();
                double y = coordinate[1].GetDouble();
                result.Add(new Coordinate(x, y));
            }

            return result;
        }

        private List<Point> ParseMultiPointCoordinates(JsonElement coordinates)
        {
            var result = new List<Point>();

            foreach (var coordinate in coordinates.EnumerateArray())
            {
                double x = coordinate[0].GetDouble();
                double y = coordinate[1].GetDouble();
                result.Add(new Point(x, y));
            }

            return result;
        }

        private List<LineString> ParseMultiLineStringCoordinates(JsonElement coordinates)
        {
            var result = new List<LineString>();

            foreach (var lineCoordinates in coordinates.EnumerateArray())
            {
                var lineStringCoordinates = ParseCoordinatesArray(lineCoordinates);
                result.Add(new LineString(lineStringCoordinates.ToArray()));
            }

            return result;
        }

        private List<Polygon> ParseMultiPolygonCoordinates(JsonElement coordinates)
        {
            var result = new List<Polygon>();

            foreach (var polygonCoordinates in coordinates.EnumerateArray())
            {
                var linearRingCoordinates = ParsePolygonCoordinates(polygonCoordinates);
                result.Add(new Polygon(new LinearRing(linearRingCoordinates.ToArray())));
            }

            return result;
        }

        private List<Coordinate> ParsePolygonCoordinates(JsonElement coordinates)
        {
            var result = new List<Coordinate>();

            foreach (var linearRingCoordinates in coordinates.EnumerateArray())
            {
                var coordinatesList = ParseCoordinatesArray(linearRingCoordinates);
                result.AddRange(coordinatesList);
            }

            return result;
        }
        public override void Write(Utf8JsonWriter writer, Geometry value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            switch (value)
            {
                case Point point:
                    writer.WriteString("type", "Point");
                    writer.WriteStartArray("coordinates");
                    writer.WriteNumberValue(point.X);
                    writer.WriteNumberValue(point.Y);
                    writer.WriteEndArray();
                    break;
                case MultiPoint multiPoint:
                    writer.WriteString("type", "MultiPoint");
                    writer.WriteStartArray("coordinates");
                    foreach (var p in multiPoint.Coordinates)
                    {
                        writer.WriteStartArray();
                        writer.WriteNumberValue(p.X);
                        writer.WriteNumberValue(p.Y);
                        writer.WriteEndArray();
                    }
                    writer.WriteEndArray();
                    break;
                case LineString lineString:
                    writer.WriteString("type", "LineString");
                    writer.WriteStartArray("coordinates");
                    foreach (var c in lineString.Coordinates)
                    {
                        writer.WriteStartArray();
                        writer.WriteNumberValue(c.X);
                        writer.WriteNumberValue(c.Y);
                        writer.WriteEndArray();
                    }
                    writer.WriteEndArray();
                    break;
                case MultiLineString multiLineString:
                    writer.WriteString("type", "MultiLineString");
                    writer.WriteStartArray("coordinates");
                    foreach (var lineString in multiLineString.Geometries.Cast<LineString>())
                    {
                        writer.WriteStartArray(); // LineString
                        foreach (var coordinate in lineString.Coordinates)
                        {
                            writer.WriteStartArray();
                            writer.WriteNumberValue(coordinate.X);
                            writer.WriteNumberValue(coordinate.Y);
                            writer.WriteEndArray();
                        }
                        writer.WriteEndArray(); // LineString
                    }
                    writer.WriteEndArray();
                    break;


                case Polygon polygon:
                    writer.WriteString("type", "Polygon");
                    writer.WriteStartArray("coordinates");
                    writer.WriteStartArray(); // LinearRing
                    foreach (var coordinate in polygon.ExteriorRing.Coordinates)
                    {
                        writer.WriteStartArray();
                        writer.WriteNumberValue(coordinate.X);
                        writer.WriteNumberValue(coordinate.Y);
                        writer.WriteEndArray();
                    }
                    writer.WriteEndArray(); // LinearRing
                    writer.WriteEndArray(); // Polygon
                    break;
                case MultiPolygon multiPolygon:
                    writer.WriteString("type", "MultiPolygon");
                    writer.WriteStartArray("coordinates");
                    foreach (var polygon in multiPolygon.Geometries.Cast<Polygon>())
                    {
                        writer.WriteStartArray(); // Polygon
                        writer.WriteStartArray(); // ExteriorRing
                        foreach (var coordinate in polygon.ExteriorRing.Coordinates)
                        {
                            writer.WriteStartArray();
                            writer.WriteNumberValue(coordinate.X);
                            writer.WriteNumberValue(coordinate.Y);
                            writer.WriteEndArray();
                        }
                        writer.WriteEndArray(); // ExteriorRing

                        foreach (var interiorRing in polygon.InteriorRings)
                        {
                            writer.WriteStartArray(); // InteriorRing
                            foreach (var coordinate in interiorRing.Coordinates)
                            {
                                writer.WriteStartArray();
                                writer.WriteNumberValue(coordinate.X);
                                writer.WriteNumberValue(coordinate.Y);
                                writer.WriteEndArray();
                            }
                            writer.WriteEndArray(); // InteriorRing
                        }

                        writer.WriteEndArray(); // Polygon
                    }
                    writer.WriteEndArray();
                    break;

                default:
                    throw new NotSupportedException($"Geometry type '{value.GetType().Name}' is not supported.");
            }

            writer.WriteEndObject();
        }

    }










    public class TestTbl
    {
        public int ID { get; set; }

        public required String AdSoyad { get; set; }

        public required Geometry Kordinat { get; set; }

        public required string RenkKodu { get; set; } = "#333";
    }
    public class Blog
    {
        public int BlogId { get; set; }
        [Display(Name = "Url Adresi")]
        public required string Url { get; set; }

        public List<Post>? Posts { get; set; }
    }

    public class Post
    {
        public required int PostId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string[] Tags { get; set; }
        public required List<string> AlternativeTags { get; set; }
        public required int BlogId { get; set; }
        public required Blog Blog { get; set; }
    }
    public class City
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        [Column(TypeName = "geometry (point)")]
        public required Point Location { get; set; }
    }
    public class MyEntity
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required IPAddress IPAddress { get; set; }
        public required NpgsqlCircle Circle { get; set; }
        public required int[] SomeInts { get; set; }
    }
}
