package com.keshe.mapper;

import com.keshe.entity.Reply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReplyMapper {

    @Select("select * from reply")
    List<Reply> getAllReply();
}
