const  express  =  Required ( "thể hiện" ) ;
const  app  =  express ( ) ;

// bắt đầu lưu trữ cổng nodejs 5000
const  PORT  =  tiến trình . env . CỔNG  ||  5000 ;
ứng dụng . nghe ( PORT , function  ( )  {
    bàn điều khiển . log ( "máy chủ đang chạy ...." ) ;
} ) ;
// ket noi db de lam viec voi du lieu
const  MSSQL  =  yêu cầu ( "MSSQL" ) ;
const  config  =  {
    máy chủ : "118.70.125.210" ,
    người dùng : "sa" ,
    mật khẩu : "z @ GH7ytQ" ,
    cơ sở dữ liệu : "QuangHoa"
} ;
mssql . kết nối ( cấu hình , chức năng  ( err )  {
    bảng điều khiển if ( err )  . nhật ký ( err ) ;
    bảng điều khiển khác . log ( "ket noi DB thanh cong!" ) ;
} ) ;
// tao 1 bien de lam viec voi db
const  sql  =  mssql mới  . Yêu cầu ( ) ;
// tao 1 routing
ứng dụng . get ( "/" , function  ( req , res )  {
    var  txt_sql  =  "select * from KhachHang;"  +
        "select * from DonHang; select * from HangHoa;" ;
    sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
        nếu ( sai ) {
            res . kết xuất ( "nhà" , {
                dskh : [ ] ,
                dsdh : [ ] ,
                dshh : [ ]
            } )
        } khác {
            res . kết xuất ( "nhà" , {
                dskh : hàng . bộ ghi [ 0 ] ,
                dsdh : hàng . bộ ghi [ 1 ] ,
                dshh : hàng . bộ ghi [ 2 ] ,
            } )
        }
    } )
    //res.send("xin chao ");
} ) ;
// khai bao web se dung view engine la ejs
ứng dụng . set ( "view engine" , "ejs" ) ;
// cap quyen truy cap cac file static in public
ứng dụng . use ( express . static ( "public" ) ) ;
// tao 1 routing chuyen dua ra danh sach khach hang
ứng dụng . get ( "/ danh-sach-khach-hang" , function  ( req , res )  {
    var  ds  =  [ ] ;
    var  txt_sql  =  "select * from KhachHang" ;
    sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
        if ( err )  ds  =  [ "Khong co khach hang nao ca" ] ;
        khác  ds  =  hàng . bộ hồ sơ ;
        res . render ( "danhsachkhachhang" , {
            ds : ds
        } ) ;
    } ) ;
    // res.send (ds);
} ) ;
// tao 1 routing chuyen dua ra danh sach hang hoa
ứng dụng . get ( "/ danh-sach-hang-hoa" , function  ( req , res )  {
    var  ds  =  [ ] ;
    var  txt_sql  =  "select * from HangHoa" ;
    sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
        if ( err )  ds  =  [ "Khong co hang hoa nao ca" ] ;
        khác  ds  =  hàng . bộ hồ sơ ;
        res . gửi ( ds ) ;
    } ) ;
    // res.send (ds);
} ) ;
// tao 1 routing chuyen dua ra danh sach hang hoa
ứng dụng . get ( "/ tim-kiem-hang-hoa" , function  ( req , res )  {
    var  thamsoxyz  =  req . truy vấn . lều tranh ;
    if ( thamsoxyz  ==  undefined ) {
        res . render ( "timkiem" , { ds : [ ] } ) ;
    } khác {
        var  ds  =  [ ] ;
        var  txt_sql  =  "select * from HangHoa where Ten like N '%" +
            thamsoxyz + "% 'HOẶC MoTa như N'%" + thamsoxyz + "% '" ;
        sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
            if ( err )  ds  =  [ "Khong co hang hoa nao ca" ] ;
            khác  ds  =  hàng . bộ hồ sơ ;
            res . kết xuất ( "timkiem" , {
                ds : ds
            } ) ;
        } ) ;
    }
} ) ;
ứng dụng . get ( "/ chi-tiet-khach-hang" , function  ( req , res )  {
    var  dienthoai  =  req . truy vấn . dienthoai ;
    var  txt_sql  =  "select * from KhachHang where DienThoai like '" + dienthoai + "'" ;
    sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
        nếu ( sai )  res . send ( "Khong co khach hang nao ca" ) ;
        khác {
            nếu ( hàng . recordset . chiều dài  >  0 ) {
                var  kh  =  hàng . tập bản ghi [ 0 ] ;
                var  txt_sql2  =  "select * from DonHang where DienThoai like '" + dienthoai + "'" ;
                sql . truy vấn ( txt_sql2 , hàm  ( err2 , row2 )  {
                    nếu ( err2 )  res . send ( "Khong co khach hang nao ca" ) ;
                    khác  {
                        res . kết xuất ( "chitietkhachhang" , {
                            kh : kh ,
                            dsdh : hàng2 . bộ hồ sơ
                        } )
                    }
                } )
            } khác  {
                res . send ( "Khong co khach hang nao ca" ) ;
            }
        }
    } )
} ) ;
// chi tiet don hang
ứng dụng . get ( "/ chi-tiet-don-hang-old" , function  ( req , res )  {
    var  ms  =  req . truy vấn . maso ;
    var  txt_sql  =  "select A. *, B.Ten, B.DiaChi from DonHang A left tham gia KhachHang B on"  +
        "B.DienThoai = A.DienThoai trong đó A.MaSo =" + ms ;
    sql . truy vấn ( txt_sql , hàm  ( err , hàng )  {
        nếu ( sai )  res . send ( "KHong co don hang nao ca" ) ;
        khác {
            var  ds  =  hàng . bộ hồ sơ ;
            if ( ds . length > 0 ) {
                var  dh  =  ds [ 0 ] ;
                var  txt_sql2  =  "select B.Ten, B.MoTa, B.DonVi, B.Gia, A.SoLuong, A.ThanhTien"  +
                    "từ DonHangHangHoa A"  +
                    "tham gia bên trong HangHoa B trên A.HHId = B.Id trong đó A.MaSoDH =" + ms ;
                sql . truy vấn ( txt_sql2 , hàm  ( err2 , row2 )  {
                    nếu ( err2 )    res . send ( "KHong co don hang nao ca" ) ;
                    khác {
                        res . kết xuất ( "chitietdonhang" , {
                            dh : dh ,
                            ds : hàng2 . bộ hồ sơ
                        } )
                    }
                } )   ;
            } khác {
                res . send ( "KHong co don hang nao ca" ) ;
            }
        }
    } ) ;
} ) ;

// lam theo async await
ứng dụng . get ( "/ chi-tiet-don-hang" , hàm async  ( req , res ) {
    var  ms  =  req . truy vấn . maso ;
    var  txt_sql  =  "select A. *, B.Ten, B.DiaChi from DonHang A left tham gia KhachHang B on"  +
        "B.DienThoai = A.DienThoai trong đó A.MaSo =" + ms ;
    thử  {
        var  kq1  =  chờ  sql . truy vấn ( txt_sql ) ;
        var  dh  =  kq1 . tập bản ghi [ 0 ] ;
        var  txt_sql2  =  "select B.Ten, B.MoTa, B.DonVi, B.Gia, A.SoLuong, A.ThanhTien"  +
            "từ DonHangHangHoa A"  +
            "tham gia bên trong HangHoa B trên A.HHId = B.Id trong đó A.MaSoDH =" + ms ;
        var  kq2  =  await  sql . truy vấn ( txt_sql2 ) ;
        res . kết xuất ( "chitietdonhang" , {
            dh : dh ,
            ds : kq2 . bộ hồ sơ
        } )
    } bắt  ( e )  {
        res . send ( "KHong co don hang nao ca" ) ;
    }

} )