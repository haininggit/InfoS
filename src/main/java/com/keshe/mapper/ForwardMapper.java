package com.keshe.mapper;

import com.keshe.entity.Forward;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ForwardMapper {

    @Select("select * from forward")
    List<Forward> getAllForward();

    @Insert("insert into forward(message_id,user_id) values(#{messageId},#{userId})")
    Integer forward(Forward forward);
}
