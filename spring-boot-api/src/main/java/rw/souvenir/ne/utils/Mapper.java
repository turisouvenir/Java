package rw.souvenir.ne.utils;

import org.modelmapper.ModelMapper;
import rw.souvenir.ne.models.User;

public class Mapper {

    public static ModelMapper modelMapper = new ModelMapper();

    public static User getUserFromDTO(Object object) {
        return modelMapper.map(object, User.class);
    }


}
