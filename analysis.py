import ifcopenshell
import ifcopenshell.geom
import ifcopenshell.util.shape



print(ifcopenshell.version)
model = ifcopenshell.file()

file_path = "models/Kaapelitehdas_junction.ifc"
ifc_file = ifcopenshell.open(file_path)


for wall in ifc_file.by_type('IfcWall'):
    # if wall.GlobalId == '3yKL7w3aP50Qs40ucQ6MHe':
        name = wall.Name
        print(f"Facade name: {name}")

        settings = ifcopenshell.geom.settings()
        shape = ifcopenshell.geom.create_shape(settings, wall)

        area = round(ifcopenshell.util.shape.get_area(shape.geometry), 2)
        print(f"Facade area: {area} m²")

        volume = round(ifcopenshell.util.shape.get_volume(shape.geometry), 2)
        print(f"Facade volume: {volume} m³")

        x = round(ifcopenshell.util.shape.get_x(shape.geometry), 2)
        y = round(ifcopenshell.util.shape.get_y(shape.geometry), 2)
        z = round(ifcopenshell.util.shape.get_z(shape.geometry), 2)
        print(f"Facade position: x = {x}, y = {y}, z = {z}")

        h = round(ifcopenshell.util.shape.get_top_elevation(shape.geometry), 2)
        print(f"Facade height: {h} m")

        side_area_x = round(
            ifcopenshell.util.shape.get_side_area(shape.geometry, 'X'), 2)
        side_area_y = round(
            ifcopenshell.util.shape.get_side_area(shape.geometry, 'Y'), 2)
        side_area_z = round(
            ifcopenshell.util.shape.get_side_area(shape.geometry, 'Z'), 2)
        print(
            f"Facade side area: x = {side_area_x} m², y = {side_area_y} m², z = {side_area_z} m²")

        perimeter = round(
            ifcopenshell.util.shape.get_footprint_perimeter(shape.geometry), 2)
        print(f"Facade perimeter: {perimeter} m")