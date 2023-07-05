i will enter a js script, convert student to admin,
also convert the link please


  useEffect(() => {
    if (isMounted) {
      studentApi
        .getStudentCount()
        .then(({ data }) => setStudentCount(data.count));
    }
  }, [isMounted]);
